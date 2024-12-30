import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  //general
  {
    path: "/",
    name: "main",
    component: () => import("@/views/general/Main.vue"),
    meta: {
      title: "SVR",
    },
  },
  {
    path: "/iniciar_sesion",
    name: "login",
    component: () => import("@/views/general/Login.vue"),
    meta: {
      title: "INICIAR SESIÓN",
    },
  },
  {
    path: "/inicio",
    name: "home",
    component: () => import("@/views/general/Home.vue"),
    meta: {
      title: "INICIO",
      req_auth: true,
      permission: true,
    },
  },
  {
    path: "/acceso_denegado",
    name: "unauthorized",
    component: () => import("@/views/general/Unauthorized.vue"),
    meta: {
      title: "ACCESO DENEGADO",
      req_auth: true,
      permission: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not_found",
    component: () => import("@/views/general/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let auth = store.getters.getAuth;

  if (to.matched.some((record) => record.meta.req_auth)) {
    if (to.matched.some((record) => record.meta.permission)) {
      if (auth) {
        next();
      } else {
        next({ name: "login" });
      }
    } else {
      next({ name: "unauthorized" });
    }
  } else {
    if (auth) {
      next({ name: "home" });
    } else {
      next();
    }
  }

  document.title = to.meta.title;
});

export default router;
