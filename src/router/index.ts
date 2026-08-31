
import { createRouter, createWebHashHistory } from 'vue-router'
import ProductSpecification from '../Views/PRM-view-product-specification.vue'
import LandingPage from '../App-pages/LandingPage.vue'


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

    }
]

const router = createRouter ({
    history: createWebHashHistory(),
    routes
})

export default router


