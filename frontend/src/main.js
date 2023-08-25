import { createApp } from "vue";
import VueCookies from "vue-cookies";
import { createWebHistory, createRouter } from "vue-router";

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
//import "@/assets/styles/tailwind.css";
import "@/assets/styles/style.css";
// mouting point for the whole app

import App from "@/App.vue";

// Vuex
import { store } from "./store/index.js";

// layouts

import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

//views
import Dashboard from "@/views/admin/Dashboard.vue";
import Settings from "@/views/admin/Settings.vue";

// Forms
//import CardForms from "@/views/forms/CardForms.vue";
import UpdatePassword from "@/views/forms/UpdatePassword.vue";

// views for Auth layout
import Login from "@/views/auth/Login.vue";

// routes

const routes = [
  {
    path: "/",
    redirect: "/admin/dashboard",
    component: Admin,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/admin/dashboard",
        component: Dashboard,
      },
      //Configuracion
      {
        path: "/admin/settings",
        component: Settings,
      },
      {
        path: "/admin/updatePassword",
        component: UpdatePassword,
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/auth/login",
    component: Auth,
    meta: { notAuthenticated: true },
    children: [
      {
        path: "/auth/login",
        component: Login,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  let ok = false;
  let path = "";

  if (!store.getters["isLogin"]) {
    try {
      await store.dispatch("verifyToken"); // Carga los datos del usuario
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters["isLogin"]) {
      path = "/auth/login";
      ok = false;
    } else {
      ok = true;
    }
  }

  if (to.matched.some((record) => record.meta.notAuthenticated)) {
    if (store.getters["isLogin"]) {
      ok = false;
      path = "/";
    } else {
      ok = true;
    }
  }

  if (ok) {
    next();
  } else {
    next({ path });
  }
});

createApp(App)
  .use(router)
  .use(store)
  .use(VueCookies, { expires: "7d" })
  .mount("#app");
