import './assets/main.css'

import { createApp } from 'vue'
import i18n from './plugins/i18n'
import pinia from './plugins/pinia'

import App from './App.vue'
import router from './router'

/* Font Awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSquare, faMessage } from '@fortawesome/free-regular-svg-icons'
import { faSquareCheck, faClock, faPause, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)

app.use(i18n)
app.use(pinia)
app.use(router)

/* More Font Awesome */
library.add(
  faSquare,
  faMessage,
  faSquareCheck,
  faClock,
  faPause,
  faPlus,
  faTrashCan
)
app.component('fa', FontAwesomeIcon)

app.mount('#app')
