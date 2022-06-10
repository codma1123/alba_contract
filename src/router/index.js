import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/bc",
      name: "bc",
      component: () => import("../components/BcHome.vue"),
    },
    {
      path: "/bc/menu1",
      name: "menu1",
      component: () => import("../components/MenuOne.vue"),
    },
    {
      path: "/bc/menu2",
      name: "menu2",
      component: () => import("../components/MenuTwo.vue"),
    },
    {
      path: "/bc/menu3",
      name: "menu3",
      component: () => import("../components/MenuThree.vue"),
    },
    {
      path: "/bc/user",
      name: "user",
      component: () => import("../components/UserComponent.vue")
    }
  ],
});

export default router;
