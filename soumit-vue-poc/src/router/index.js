import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from '../components/HelloWorld';
import Soumit from '../components/Soumit';
import Pricing from '../components/Pricing';
import SubMenuOne from "../components/SubMenuOne";
import SubMenuThree from "../components/SubMenuThree";
import NProgress from "nprogress";

const routes = [

    {
        path: "/",
        name: "Home",
        component: HelloWorld,
    },
    {
        path: "/soumit",
        name: "Soumit",
        component: Soumit,
    },
    {
        path: "/pricing",
        name: "Pricing",
        component: Pricing,
    },
      {
        path: "/submenu1",
        name: "SubMenuOne",
        component: SubMenuOne,
      },
      {
        path: "/submenu2",
        name: "SubMenuTwo",
        component: () => import(/* webpackChunkName: "submenu2" */ '../components/SubMenuTwo'),
      },
      {
        path: "/submenu3",
        name: "SubMenuThree",
        component: SubMenuThree,
      },
];

const router = createRouter({
    // mode: 'history', It will show the route in the URL.
    mode: 'history',
    hash: true,
    history: createWebHistory(),
    routes
});

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar.
        NProgress.start()
    }
    next()
})

router.afterEach(() => {
    // Complete the animation of the route progress bar.
    NProgress.done()
})

export default router;