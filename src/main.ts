import { createApp } from 'vue'
import { 
    defineCustomElementPnHeader, 
    defineCustomElementPnButton, 
    defineCustomElementPnCard,
    defineCustomElementPnAccordion,
    defineCustomElementPnAccordionRow,
    defineCustomElementPnIcon,
    defineCustomElementPnTablist,
    defineCustomElementPnTab,
    defineCustomElementPnMultiselect,
    defineCustomElementPnTable,
    defineCustomElementPnPagination
} from '@postnord/web-components/components'

import 'pn-design-assets/pn-assets/styles/pn-styles.scss'
import './style.css'
import App from './App.vue'
import router from './router/index.ts'

defineCustomElementPnHeader()
defineCustomElementPnButton()
defineCustomElementPnCard()
defineCustomElementPnAccordion()
defineCustomElementPnAccordionRow()
defineCustomElementPnIcon()
defineCustomElementPnTablist()
defineCustomElementPnTab()
defineCustomElementPnMultiselect()
defineCustomElementPnTable()
defineCustomElementPnPagination()

createApp(App).use(router).mount('#app')