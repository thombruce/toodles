import './assets/main.css'

import { createApp } from 'vue'
import pinia from './plugins/pinia'

import App from './App.vue'
import router from './router'

/* Font Awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSquare, faMessage } from '@fortawesome/free-regular-svg-icons'
import { faSquareCheck, faClock, faPause, faPlus } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)

app.use(pinia)
app.use(router)

/* More Font Awesome */
library.add(
  faSquare,
  faMessage,
  faSquareCheck,
  faClock,
  faPause,
  faPlus
)
app.component('fa', FontAwesomeIcon)

app.mount('#app')
