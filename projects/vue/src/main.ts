// Import CSS
import '@ui/dist/styles.css'
import './assets/main.css'

import { createPinia } from 'pinia'
import { clickOutsideDirective, tooltipDirective } from 'ui-components'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.directive('clickOutside', clickOutsideDirective)
app.directive('tooltip', tooltipDirective)

app.mount('#app')
