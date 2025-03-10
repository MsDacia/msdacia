import content from '../media/json/static.en-us.json'

export default function Education() {
	return (
		<div className="ui card">
			<div className="content">
				<div className="header">{content.resume.education?.school ?? 'Unknown School'}</div>

				<div className="meta">
					<div className="category">{content.resume.education?.degree ?? 'Degree Not Provided'}</div>
				</div>

				<div className="description">
					{content.resume.education?.major && (
						<p>{content.resume.education.major}<br /><em>Major</em></p>
					)}

					{content.resume.education?.minor && (
						<p>{content.resume.education.minor}<br /><em>Minor</em></p>
					)}

					{content.resume.education?.specialization && (
						<p>{content.resume.education.specialization}<br /><em>Specialization</em></p>
					)}
				</div>
			</div>
		</div>
	)
}
