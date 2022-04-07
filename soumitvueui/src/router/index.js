import { createWebHistory, createRouter } from "vue-router";
import Inception from "../components/Inception.vue";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Note from "../components/Note.vue";
import Notification from "../components/Notification.vue";
import RegisterUser from "../components/RegisterUser.vue";
import Graph from "../components/Graph.vue";
import Counter from "../components/Counter.vue";
import Weather from "../components/Weather.vue";
import Logout from "../components/Logout.vue";
import NProgress from "nprogress";

const routes = [

  {
    path: "/",
    name: "Home",
    component: Inception,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/other",
    name: "Other",
    component: Home,
  },
  {
    path: "/note",
    name: "Note",
    component: Note,
  },
  {
    path: "/alertnotification",
    name: "Notification",
    component: Notification,
  },
  {
    path: "/balanceenquery",
    name: "BalanceEnquery",
    component: () => import(/* webpackChunkName: "about" */ '../components/BalanceEnquery.vue'),
    beforeEnter: (to, from, next) => {
      if (to !=from) {//if (localStorage.getItem('candidate_id')) {
        next()
      } else {
        next({
          path: '/login', // back to safety
          query: {
            redirectFrom: to.fullPath
          }
        })
      }
    }
  },
  {
    path: "/experiment",
    name: "Experiment",
    component: () => import(/* webpackChunkName: "about" */ '../components/Experiment.vue'),
  },
  {
    path: "/sitemap",
    name: "SiteMap",
    component: () => import(/* webpackChunkName: "about" */ '../components/SiteMap.vue'),
  },
  {
    path: "/register",
    name: "RegisterUser",
    component: RegisterUser,
  },
  {
    path: "/graph",
    name: "Graph",
    component: Graph,
  },
  {
    path: "/counters",
    name: "Counter",
    component: Counter,
  },
  {
    path: "/balancecheck",
    name: "WalletBalance",
    component: () => import(/* webpackChunkName: "about" */ '../components/WalletBalance.vue'),//component: WalletBalance,
    beforeEnter: (to, from, next) => {
      if (to!=from) {// if (localStorage.getItem('candidate_id')) {
        next()
      } else {
        next({
          path: '/login', // back to safety
          query: {
            redirectFrom: to.fullPath
          }
        })
      }
    }
  },
  {
    path: "/tranasction",
    name: "Transaction",
    // component: Transaction,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Transaction.vue'),
    beforeEnter: (to, from, next) => {
      if(to != from){//if (localStorage.getItem('candidate_id')) {
        next()
      } else {
        next({
          path: '/login', // back to safety
          query: {
            redirectFrom: to.fullPath
          }
        })
      }
    }
  },
  {
    path: "/weather",
    name: "WeatherView",
    component: Weather,
  },
  {
    path: "/users",
    name: "UserDetails",
    component: () => import(/* webpackChunkName: "about" */ '../components/UserDetails.vue'),
    beforeEnter: (to, from, next) => {
      if(to!=from){//if (localStorage.getItem('rolename') == 'Admin') {
        next()
      } else {
        next({
          path: '/login', // back to safety
          query: {
            redirectFrom: to.fullPath
          }
        })
      }
    }
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  }
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
  console.log(to);
  console.log(from);
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  console.log(to);
  console.log(from);
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router;