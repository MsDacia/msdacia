import Vue from 'vue'
import SwitchTheme from 'src/components/switch-theme'

// .container header .eyedropper
describe('SwitchTheme', () => {
	it('should switch the theme of the site', () => {
		const vm = new Vue({
			el: document.createElement('div'),
			render: (h) => h(SwitchTheme)
		})

		vm.colorsInverted()
		console.log('body', document.getElementsByTagName('body'))
	})
})
