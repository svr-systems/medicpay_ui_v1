import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  //users
  {
    path: "/usuarios",
    name: "users",
    component: () => import("@/views/users/Index.vue"),
    meta: {
      title: "Usuarios",
      icon: "mdi-account-multiple",
      req_auth: true,
      permission: true,
    },
  },
  {
    path: "/usuarios/agregar",
    name: "users.store",
    component: () => import("@/views/users/StoreUpdate.vue"),
    meta: {
      title: "Usuario | Agregar",
      icon: "mdi-account",
      req_auth: true,
      permission: true,
    },
  },
  {
    path: "/usuarios/:id",
    name: "users.show",
    component: () => import("@/views/users/Show.vue"),
    meta: {
      title: "Usuario",
      icon: "mdi-account",
      req_auth: true,
      permission: true,
    },
    props: true,
  },
  {
    path: "/usuarios/:id/editar",
    name: "users.update",
    component: () => import("@/views/users/StoreUpdate.vue"),
    meta: {
      title: "Usuario | Editar",
      icon: "mdi-account",
      req_auth: true,
      permission: true,
    },
    props: true,
  },
  {
    path: "/mi_perfil",
    name: "users.profile",
    component: () => import("@/views/users/Show.vue"),
    meta: {
      title: "Mi perfil",
      icon: "mdi-card-account-details",
      req_auth: true,
      permission: true,
    },
    props: true,
  },
  {
    path: "/mi_perfil/editar",
    name: "users.profile_update",
    component: () => import("@/views/users/StoreUpdate.vue"),
    meta: {
      title: "Mi perfil | Editar",
      icon: "mdi-card-account-details",
      req_auth: true,
      permission: true,
    },
    props: true,
  },
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
      title: "Iniciar Sesión",
    },
  },
  {
    path: "/inicio",
    name: "home",
    component: () => import("@/views/general/Home.vue"),
    meta: {
      title: "Inicio",
      req_auth: true,
      permission: true,
    },
  },
  {
    path: "/acceso_denegado",
    name: "unauthorized",
    component: () => import("@/views/general/Unauthorized.vue"),
    meta: {
      title: "Acceso Denegado",
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
