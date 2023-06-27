import { library } from '@fortawesome/fontawesome-svg-core'

/* Regular */
import {
  faSquare,
  faMessage
} from '@fortawesome/free-regular-svg-icons'

/* Solid */
import {
  faSquareCheck,
  faClock,
  faPause,
  faPlus,
  faTrashCan,
  faLanguage
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faSquare,
  faMessage,
  faSquareCheck,
  faClock,
  faPause,
  faPlus,
  faTrashCan,
  faLanguage
)

export { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
