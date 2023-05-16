import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* Font Awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)

app.use(createPinia())
app.use(router)

/* More Font Awesome */
library.add(faSquare, faSquareCheck)
app.component('fa', FontAwesomeIcon)

app.mount('#app')
