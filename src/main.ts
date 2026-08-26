import { createApp } from 'vue'
import { defineCustomElementPnHeader, 
    defineCustomElementPnButton, 
    defineCustomElementPnCard,
    defineCustomElementPnAccordion,
    defineCustomElementPnAccordionRow,
    defineCustomElementPnIcon } from '@postnord/web-components/components'


import 'pn-design-assets/pn-assets/styles/pn-styles.scss'
import './style.css'
import App from './App.vue'



defineCustomElementPnHeader()
defineCustomElementPnButton()
defineCustomElementPnCard()
defineCustomElementPnAccordion()
defineCustomElementPnAccordionRow()
defineCustomElementPnIcon ()


createApp(App).mount('#app')
