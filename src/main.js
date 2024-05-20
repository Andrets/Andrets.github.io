import 'primeicons/primeicons.css'
import ConfirmationService from 'primevue/confirmationservice'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/aura-light-noir/theme.css'
import ToastService from 'primevue/toastservice'
import { createPinia } from '../node_modules/pinia'
import PrimeVue from '../node_modules/primevue'
import { createApp } from '../node_modules/vue'
import App from './App.vue'
import router from './router.js'
import './style.css'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(ToastService)
app.use(PrimeVue)
app.use(ConfirmationService)
app.use(router)
app.mount('#app')
