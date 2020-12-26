import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import('../views/Home.vue')
  },
  {
  	path: "/Search",
  	name: "Search",
  	component: () => import('../components/Search.vue'),
    props: true
  },
  {
  	path: "/List",
  	name: "List",
  	component: () => import('../components/List.vue'),
    props: true
  },
  {
  	path: "/User",
  	name: "User",
  	component: () => import('../components/User.vue'),
    props: true
  },
  {
    path: "/Music_container",
    name: "Music_container",
    component: () => import('../components/Music_container.vue'),
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
