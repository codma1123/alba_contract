import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../components/BcHome.vue"),
    },    
    {
      path: "/bc",
      name: "bc",
      component: () => import("../components/BcHome.vue"),
    },
    {
      path: "/bc/menu1",
      name: "menu1",
      component: () => import("../components/CreateContract.vue"),
    },
    {
      path: "/bc/menu2",
      name: "menu2",
      component: () => import("../components/WatchContract.vue"),
    },
    {
      path: "/bc/menu3",
      name: "menu3",
      component: () => import("../components/SearchContract.vue"),
    },    
    {
      path: "/user",
      name: "user",
      component: () => import("../views/UserView.vue")
    },
    {
      path: "/contract/:id",
      name: "contract",
      component: () => import("../views/ContractView.vue")
    },
    {
      path: "/user/info",
      name: "info",
      component: () => import("../components/UserInfo.vue")
    }
  ],
});

export default router;
