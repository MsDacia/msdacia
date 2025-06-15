import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import CSS
import './assets/main.css'
import 'hover.css/css/hover-min.css'
import '@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
