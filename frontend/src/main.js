import { createApp } from "vue";
import VueCookies from "vue-cookies";
import { createWebHistory, createRouter } from "vue-router";

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
//import "@/assets/styles/tailwind.css";
import "@/assets/styles/style.css";
import "@/assets/styles/index.css";
// mouting point for the whole app

import App from "@/App.vue";

// Vuex
import { store } from "./store/index.js";

// layouts

import AdminLayout from "@/layouts/Admin.vue";
import AuthLayout from "@/layouts/Auth.vue";

//views
// Admin
import Dashboard from "@/views/admin/Dashboard.vue";
//Users
import Admin from "@/views/admin/Admin.vue";
import Carrier from "@/views/admin/Carrier.vue";
import Driver from "@/views/admin/Driver.vue";
import Guard from "@/views/admin/Guard.vue";
import Manager from "@/views/admin/Manager.vue";

import Paf from "@/views/admin/Paf.vue";
import Incident from "@/views/admin/Incident.vue";

// Forms
//import CardForms from "@/views/forms/CardForms.vue";
import UpdatePassword from "@/views/forms/UpdatePassword.vue";
import Settings from "@/views/forms/Settings.vue";

// Admin
import UserForms from "@/views/admin/forms/UserForms.vue";
import DriverForms from "@/views/admin/forms/DriverForms.vue";
import PafForms from "@/views/admin/forms/PafForms.vue";
import IncidentForms from "@/views/admin/forms/IncidentForms.vue";

// views for Auth layout
import Login from "@/views/auth/Login.vue";

// routes

const routes = [
  {
    path: "/",
    redirect: "/admin/dashboard",
    component: AdminLayout,
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
      //Usuraios
      {
        path: "/admin/admin",
        component: Admin,
      },
      {
        path: "/admin/carrier",
        component: Carrier,
      },
      {
        path: "/admin/driver",
        component: Driver,
      },
      {
        path: "/admin/guard",
        component: Guard,
      },
      {
        path: "/admin/manager",
        component: Manager,
      },
      {
        path: "/admin/addUser",
        component: UserForms,
      },
      {
        path: "/admin/updateUser",
        component: UserForms,
      },
      // Conductores
      {
        path: "/admin/addDriver",
        component: DriverForms,
      },
      {
        path: "/admin/updateDriver",
        component: DriverForms,
      },
      // paf
      {
        path: "/admin/paf",
        component: Paf,
      },
      {
        path: "/admin/addPaf",
        component: PafForms,
      },
      {
        path: "/admin/updatePaf",
        component: PafForms,
      },
      // Incidentes
      {
        path: "/admin/incident",
        component: Incident,
      },
      {
        path: "/admin/addIncident",
        component: IncidentForms,
      },
      {
        path: "/admin/updateIncident",
        component: IncidentForms,
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/auth/login",
    component: AuthLayout,
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
