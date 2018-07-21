import * as async from 'async'
import * as inquirer from 'inquirer'
import * as Listr from 'listr'
import * as path from 'path'
import * as readdir from 'recursive-readdir'
import * as SftpClient from 'ssh2-sftp-client'
import * as Observable from 'zen-observable'

const HOST = 'msdacia.com'
const DEPLOY_DIR = '/home/msdacia.com/'

;(async function (){
	const answers = await inquirer.prompt<{ password: string, username: string }>([
		{
			default: 'msdacia',
			message: 'User Name:',
			name: 'username',
			type: 'input'
		},
		{
			message: 'Password:',
			name: 'password',
			type: 'password'
		}
	])

	const { username, password } = answers

	const sftp = new SftpClient()

	const createQueue = async.queue<CreatePayload, Error>(({ observer, remotePath, title }, callback) => {
		createQueue.drain = () => observer.complete()
		observer.next(title)
		sftp.mkdir(remotePath, true).then(() => callback()).catch(callback)
	})

	const uploadQueue = async.priorityQueue<UploadPayload, Error>(({ localPath, observer, remotePath, title }, callback) => {
		uploadQueue.drain = () => observer.complete()
		const remainingCount = uploadQueue.length()
		const inProgressTitles = uploadQueue.workersList()
			.map(worker => worker.data.title)
			.sort()
			.map(title => title.length <= 27 ? title : `${title.substr(0, 12)}...${title.slice(-12)}`)
		const message = inProgressTitles.join(', ') + (remainingCount ? ` + ${remainingCount} more` : '')
		observer.next(message)
		sftp.put(localPath, remotePath, true).then(() => callback()).catch(callback)
	}, 4)

	const deleteQueue = async.queue<DeletePayload, Error>(({ observer, remotePath, title }, callback) => {
		deleteQueue.drain = () => observer.complete()
		observer.next(title)
		sftp.delete(remotePath).then(() => callback()).catch(callback)
	})

	try {
		await sftp.connect({ host: HOST, username, password })

		const [localFiles, remoteFiles] = await Promise.all([
			(await readdir('dist')).map(file => path.relative('dist', file)).map(file => path.posix.format(path.parse(file))),
			(await readdirRemote(sftp, DEPLOY_DIR)).map(file => path.posix.relative(DEPLOY_DIR, file)),
		])

		const remoteFilesToDelete = getRemoteFilesToDelete(remoteFiles, localFiles)
		const remoteDirectoriesToCreate = getRequiredDirectories(localFiles)

		const createObserver = new Observable<string>(observer => {
			for (const directory of remoteDirectoriesToCreate) {
				const remotePath = path.posix.join(DEPLOY_DIR, directory)
				createQueue.push({ observer, remotePath, title: directory })
			}
		})

		const uploadObserver = new Observable<string>(observer => {
			for (const file of localFiles) {
				const localPath = path.resolve(path.join('dist', file))
				const remotePath = path.posix.join(DEPLOY_DIR, file)
				const payload: UploadPayload = {
					localPath,
					observer,
					remotePath,
					title: file,
				}

				uploadQueue.push(payload, getUploadPriority(file))
			}
		})

		const deleteObserver = new Observable<string>(observer => {
			for (const file of remoteFilesToDelete) {
				const remotePath = path.posix.join(DEPLOY_DIR, file)
				deleteQueue.push({ observer, remotePath, title: file })
			}
		})

		await new Listr([
			{
				title: `Creating ${remoteDirectoriesToCreate.length} Directories`,
				task: () => createObserver as any,
				skip: () => remoteDirectoriesToCreate.length === 0 ? 'No directories to create' : '',
			},
			{
				title: `Uploading ${localFiles.length} File(s)`,
				task: () => uploadObserver as any,
				skip: () => localFiles.length === 0 ? 'No files to upload' : '',
			},
			{
				title: `Deleting ${remoteFilesToDelete.length} File(s)`,
				task: () => deleteObserver as any,
				skip: () => remoteFilesToDelete.length === 0 ? 'No files to delete' : '',
			},
		]).run()

		await sftp.end()

		console.log('Done')
	} catch (err) {
		console.log(err)
	}

	process.exit(0)

}())

/**
 * Gets the list of remote files that should be deleted (e.g., do not exist
 * locally)
 *
 * @param remoteFiles
 * 		The list of remote files.
 * @param localFiles
 * 		The list of local files.
 *
 * @returns
 * 		The list of files that only exists remotely.
 */
function getRemoteFilesToDelete(remoteFiles: string[], localFiles: string[]): string[] {
	return remoteFiles.filter(file => !localFiles.includes(file))
}

/**
 * Gets the upload priority for the specified file.
 *
 * @param file
 * 		The file path.
 *
 * @returns
 * 		A number representing the upload priority (smaller number is higher
 * 		priority).
 */
function getUploadPriority(file: string): number {
	switch (path.extname(file)) {
		case '.html':
			return 6
		case '.js':
			return 5
		case '.css':
			return 4
		default:
			return 3
		case '.jpg':
		case '.png':
		case '.svg':
			return 2
		case '':
			return 1
	}
}

/**
 * Gets the list of files in the remote directory recursively.
 *
 * @param sftp
 * 		The SFTP client.
 * @param remotePath
 * 		The remote directory.
 *
 * @returns
 * 		A Promise that resolved with the list of remote files.
 */
async function readdirRemote(sftp: SftpClient, remotePath: string): Promise<string[]> {
	const files: string[] = []

	const remoteFiles = await sftp.list(remotePath)

	for (const remoteFile of remoteFiles) {
		const remoteFilePath = path.posix.join(remotePath, remoteFile.name)
		switch (remoteFile.type) {
			case '-':
				files.push(remoteFilePath)
				break
			case 'd':
				files.push(...await readdirRemote(sftp, remoteFilePath))
				break
		}
	}

	return files
}

/**
 * Gets the directories that need to be created on the remote.
 *
 * @param localFiles
 * 		The list of local files.
 *
 * @param
 * 		The list of directories.
 */
function getRequiredDirectories(localFiles: string[]): string[] {
	return Array.from(new Set(localFiles.map(file => path.dirname(file))))
}

interface CreatePayload {
	observer: ZenObservable.SubscriptionObserver<string>
	remotePath: string
	title: string
}

interface DeletePayload {
	observer: ZenObservable.SubscriptionObserver<string>
	remotePath: string
	title: string
}

interface UploadPayload {
	localPath: string
	observer: ZenObservable.SubscriptionObserver<string>
	remotePath: string
	title: string
}
