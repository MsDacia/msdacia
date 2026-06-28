import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { clickOutsideDirective, tooltipDirective } from 'ui-components'
import App from './App.vue'
import router from './router'

// Import CSS
import '@ui/dist/styles.css'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.directive('clickOutside', clickOutsideDirective)
app.directive('tooltip', tooltipDirective)

app.mount('#app')
