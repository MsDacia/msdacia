import cssnano from 'cssnano'
import postcssImport from 'postcss-import'
import postcssPresetEnv from 'postcss-preset-env'

export default {
	plugins: [
		postcssImport(),
		postcssPresetEnv({ stage: 1 }),
		cssnano(),
	],
}
