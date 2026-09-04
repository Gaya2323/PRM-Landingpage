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

const app = createApp(App)

//Fånga fel JS-fel globalt
window.addEventListener('error',(event) => {
    if(event.message?.includes('scrollWidth') || event.message?.includes('tabListEl')) {
        console.warn('pn-tablist error suppressed:', event.message)
        event.preventDefault()
        return false
    }
})

// Patcha pn-tablist för att förhindra scrollWidth-krasch på GitHub Pages
window.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver(() => {
    const tablists = document.querySelectorAll('pn-tablist')
    tablists.forEach((tablist: any) => {
      if (!tablist.tabListEl) {
        tablist.tabListEl = tablist.querySelector('.pn-tablist') || tablist
      }
    })
  })
  observer.observe(document.body, { childList: true, subtree: true })
})
app.use(router).mount('#app')