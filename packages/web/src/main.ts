import './assets/main.css'

import { createApp } from 'vue'
import i18n from './plugins/i18n'
import pinia from './plugins/pinia'

import App from './App.vue'
import router from './router'

/* Font Awesome */
import { FontAwesomeIcon } from './plugins/fontawesome'

const app = createApp(App)

app.use(i18n)
app.use(pinia)
app.use(router)

app.component('fa', FontAwesomeIcon)

app.mount('#app')
