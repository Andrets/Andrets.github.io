import { createPinia } from 'pinia' // Обратите внимание на изменение пути
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue' // Обратите внимание на изменение пути
import ConfirmationService from 'primevue/confirmationservice'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/aura-light-noir/theme.css'
import ToastService from 'primevue/toastservice'
import { createApp } from 'vue' // Обратите внимание на изменение пути
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
