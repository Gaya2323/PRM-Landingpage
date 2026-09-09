
import { createRouter, createWebHashHistory } from 'vue-router'
import ProductSpecification from '../Views/PRM-view-product-specification.vue'
import LandingPage from '../App-pages/LandingPage.vue'
import ProductConfiguration from '../Views/PRM-view-product-configuration.vue'



const routes = [
    {
        path: '/',
        name: 'landing',
        component: LandingPage
    },
    {
        path: '/product-specification',
        name: 'product-specification',
        component: ProductSpecification

    },
    {
        path: '/product-configuration',
        name: 'product-configuration',
        component: ProductConfiguration

    },
   
]

const router = createRouter ({
    history: createWebHashHistory(),
    routes
})

export default router


