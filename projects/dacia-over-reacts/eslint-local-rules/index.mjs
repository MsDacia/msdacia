import path from 'node:path'
import { fileURLToPath } from 'node:url'

const DEFAULT_MIN_ITEMS = 3
const ROOT_DIR = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
// Sorted longest-dir-first so nested alias roots (e.g. @icons) are matched before their
// ancestors (e.g. @vuejs) in resolveAliasImportPath, regardless of this list's declaration order.
const ALIASES = [
	{ alias: '@', dir: path.join(ROOT_DIR, './src') },
	{ alias: '@/tests', dir: path.join(ROOT_DIR, './tests') },
	{ alias: '@ui', dir: path.join(ROOT_DIR, './node_modules/ui-components') },
].sort((a, b) => b.dir.length - a.dir.length)

function countLeadingParentSegments(importPath) {
	let remaining = importPath
	let count = 0

	while (remaining.startsWith('../')) {
		count += 1
		remaining = remaining.slice('../'.length)
	}

	return count
}

function createCountNewlineRule({ getItems, itemLabel }) {
	return {
		create(context) {
			const minItems = context.options[0]?.minItems ?? DEFAULT_MIN_ITEMS
			const sourceCode = context.sourceCode ?? context.getSourceCode()

			function check(node) {
				const items = getItems(node)

				if (items.length < minItems || items.some(item => item === null)) return

				const openToken = sourceCode.getFirstToken(node)
				const closeToken = node.typeAnnotation
					? sourceCode.getTokenBefore(node.typeAnnotation)
					: sourceCode.getLastToken(node)
				const fixes = []

				const firstItem = items[0]

				if (openToken.loc.end.line === firstItem.loc.start.line) {
					fixes.push(fixer => fixer.insertTextAfter(openToken, '\n'))
				}

				const tokenBeforeClose = sourceCode.getTokenBefore(closeToken)

				if (tokenBeforeClose.loc.end.line === closeToken.loc.start.line) {
					fixes.push(fixer => fixer.insertTextBefore(closeToken, '\n'))
				}

				for (let i = 0; i < items.length - 1; i++) {
					const commaToken = sourceCode.getTokenAfter(items[i], token => token.value === ',')
					const nextItem = items[i + 1]

					if (commaToken.loc.end.line === nextItem.loc.start.line) {
						fixes.push(fixer => fixer.insertTextAfter(commaToken, '\n'))
					}
				}

				if (fixes.length > 0) {
					context.report({
						fix: fixer => fixes.map(applyFix => applyFix(fixer)),
						message: `Expected each of the ${items.length} ${itemLabel} to be on its own line.`,
						node,
					})
				}
			}

			return itemLabel === 'elements'
				? { ArrayExpression: check, ArrayPattern: check }
				: { ObjectExpression: check, ObjectPattern: check }
		},
		meta: {
			fixable: 'whitespace',
			schema: [
				{
					additionalProperties: false,
					properties: { minItems: { type: 'integer' } },
					type: 'object',
				},
			],
			type: 'layout',
		},
	}
}

function createNoRelativeParentImportsRule() {
	return {
		create(context) {
			const filename = context.filename ?? context.getFilename()

			function check(node) {
				const sourceNode = node.source

				if (!sourceNode || sourceNode.type !== 'Literal' || typeof sourceNode.value !== 'string') return

				const importPath = sourceNode.value

				if (countLeadingParentSegments(importPath) < 2) return

				const aliasPath = resolveAliasImportPath(filename, importPath)

				if (!aliasPath) return

				const quote = sourceNode.raw[0]

				context.report({
					fix: fixer => fixer.replaceText(sourceNode, `${quote}${aliasPath}${quote}`),
					message: `Use path alias "${aliasPath}" instead of relative import "${importPath}".`,
					node: sourceNode,
				})
			}

			return {
				ExportAllDeclaration: check,
				ExportNamedDeclaration: check,
				ImportDeclaration: check,
				ImportExpression: check,
			}
		},
		meta: {
			fixable: 'code',
			schema: [],
			type: 'suggestion',
		},
	}
}

function resolveAliasImportPath(fromFile, importPath) {
	const absoluteTarget = path.resolve(path.dirname(fromFile), importPath)

	for (const { alias, dir } of ALIASES) {
		const relativeToAliasDir = path.relative(dir, absoluteTarget)

		if (!relativeToAliasDir.startsWith('..') && !path.isAbsolute(relativeToAliasDir)) {
			return `${alias}/${relativeToAliasDir.split(path.sep).join('/')}`
		}
	}

	return null
}

export default {
	rules: {
		'array-elements-per-line': createCountNewlineRule({
			getItems: node => node.elements,
			itemLabel: 'elements',
		}),
		'no-relative-parent-imports': createNoRelativeParentImportsRule(),
		'object-properties-per-line': createCountNewlineRule({
			getItems: node => node.properties,
			itemLabel: 'properties',
		}),
	},
}
