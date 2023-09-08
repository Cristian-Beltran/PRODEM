import { createApp } from "vue";
import VueCookies from "vue-cookies";
import { createWebHistory, createRouter } from "vue-router";
import { createVfm } from "vue-final-modal";
// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
//import "@/assets/styles/tailwind.css";
import "@/assets/styles/style.css";
import "@/assets/styles/index.css";

// import css from vue-modal-final
import "vue-final-modal/style.css";

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
import Remesa from "@/views/admin/Remesa.vue";
//Vehicle
import Incident from "@/views/admin/Incident.vue";
import Vehicle from "@/views/admin/Vehicle.vue";
import Fueling from "@/views/admin/Fueling.vue";
import Maintenance from "@/views/admin/Maintenance.vue";
import MaintenanceType from "@/views/admin/MaintenanceType.vue";
import Verify from "@/views/admin/Verify.vue";
// Transport Paf

import Paf from "@/views/admin/Paf.vue";
// Forms
//import CardForms from "@/views/forms/CardForms.vue";
import UpdatePassword from "@/views/forms/UpdatePassword.vue";
import Settings from "@/views/forms/Settings.vue";

// Admin Forms
import UserForms from "@/views/admin/forms/UserForms.vue";
import DriverForms from "@/views/admin/forms/DriverForms.vue";
import PafForms from "@/views/admin/forms/PafForms.vue";
import IncidentForms from "@/views/admin/forms/IncidentForms.vue";
import VehicleForms from "@/views/admin/forms/VehicleForms.vue";
import FuelingForms from "@/views/admin/forms/FuelingForms.vue";
import MaintenanceForms from "@/views/admin/forms/MaintenanceForms.vue";
import MaintenanceTypeForms from "@/views/admin/forms/MaintenanceTypeForms.vue";
import VerifyForms from "@/views/admin/forms/VerifyForms.vue";

// Views from drivers
import DriverVehicle from "@/views/driver/Vehicle.vue";
import DriverFueling from "@/views/driver/Fueling.vue";
import DriverRoute from "@/views/driver/Route.vue";
import DriverVerify from "@/views/driver/Verify.vue";
import DriverMaitenance from "@/views/driver/Maintenance.vue";

import DriverFuelingForms from "@/views/driver/forms/FuelingForms.vue";
import DriverVerifyForms from "@/views/driver/forms/VerifyForms.vue";
import DriverMaintenanceForms from "@/views/driver/forms/MaintenanceForms.vue";

//Views from manager
import ManagerRouteSend from "@/views/manager/RouteSend.vue";

//Views from carrier
import CarrierRoute from "@/views/carrier/Route.vue";

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
        meta: { admin: true },
      },
      //Configuracion
      {
        path: "/admin/settings",
        component: Settings,
        meta: { admin: true },
      },
      {
        path: "/admin/updatePassword",
        component: UpdatePassword,
        meta: { admin: true },
      },
      //Usuraios
      {
        path: "/admin/admin",
        component: Admin,
        meta: { admin: true },
      },
      {
        path: "/admin/carrier",
        component: Carrier,
        meta: { admin: true },
      },
      {
        path: "/admin/driver",
        component: Driver,
        meta: { admin: true },
      },
      {
        path: "/admin/guard",
        component: Guard,
        meta: { admin: true },
      },
      {
        path: "/admin/manager",
        component: Manager,
        meta: { admin: true },
      },
      {
        path: "/admin/addUser",
        component: UserForms,
        meta: { admin: true },
      },
      {
        path: "/admin/updateUser",
        component: UserForms,
        meta: { admin: true },
      },
      // Conductores
      {
        path: "/admin/addDriver",
        component: DriverForms,
        meta: { admin: true },
      },
      {
        path: "/admin/updateDriver",
        component: DriverForms,
        meta: { admin: true },
      },
      // paf
      {
        path: "/admin/paf",
        component: Paf,
        meta: { admin: true },
      },
      {
        path: "/admin/addPaf",
        component: PafForms,
        meta: { admin: true },
      },
      {
        path: "/admin/updatePaf",
        component: PafForms,
        meta: { admin: true },
      },
      // Incidentes
      {
        path: "/admin/incident",
        component: Incident,
        meta: { admin: true },
      },
      {
        path: "/admin/addIncident",
        component: IncidentForms,
        meta: { admin: true },
      },
      {
        path: "/admin/updateIncident",
        component: IncidentForms,
        meta: { admin: true },
      },
      // Vehiculos
      {
        path: "/admin/vehicle",
        component: Vehicle,
        meta: { admin: true },
      },
      {
        path: "/admin/addVehicle",
        component: VehicleForms,
        meta: { admin: true },
      },
      {
        path: "/admin/updateVehicle",
        component: VehicleForms,
        meta: { admin: true },
      },
      // Fueling
      {
        path: "/admin/fueling/:id",
        component: Fueling,
        meta: { admin: true },
      },
      {
        path: "/admin/addFueling/:id",
        component: FuelingForms,
        meta: { admin: true },
      },
      {
        path: "/admin/updateFueling/:id",
        component: FuelingForms,
        meta: { admin: true },
      },
      // Maintenance
      {
        path: "/admin/maintenance/:id",
        component: Maintenance,
        meta: { admin: true },
      },
      {
        path: "/admin/addMaintenance/:id",
        component: MaintenanceForms,
        meta: { admin: true },
      },
      {
        path: "/admin/updateMaintenance/:id",
        component: MaintenanceForms,
        meta: { admin: true },
      },
      // Tipo de mantenimiento
      {
        path: "/admin/maintenanceType",
        component: MaintenanceType,
        meta: { admin: true },
      },
      {
        path: "/admin/addMaintenanceType",
        component: MaintenanceTypeForms,
        meta: { admin: true },
      },
      {
        path: "/admin/updateMaintenanceType",
        component: MaintenanceTypeForms,
        meta: { admin: true },
      },
      // Tipo de mantenimiento
      {
        path: "/admin/verify",
        component: Verify,
        meta: { admin: true },
      },
      {
        path: "/admin/addVerify",
        component: VerifyForms,
        meta: { admin: true },
      },
      {
        path: "/admin/updateVerify",
        component: VerifyForms,
        meta: { admin: true },
      },
      // Remesas
      {
        path: "/admin/remesa",
        component: Remesa,
        meta: { admin: true },
      },
      // Path driver
      {
        path: "/driver/vehicle",
        component: DriverVehicle,
        meta: { driver: true },
      },
      {
        path: "/driver/fueling",
        component: DriverFueling,
        meta: { driver: true },
      },
      {
        path: "/driver/addFueling",
        component: DriverFuelingForms,
        meta: { driver: true },
      },
      {
        path: "/driver/maintenance",
        component: DriverMaitenance,
        meta: { driver: true },
      },
      {
        path: "/driver/addMaintenance",
        component: DriverMaintenanceForms,
        meta: { driver: true },
      },
      {
        path: "/driver/verify",
        component: DriverVerify,
        meta: { driver: true },
      },
      {
        path: "/driver/addVerify",
        component: DriverVerifyForms,
        meta: { driver: true },
      },
      {
        path: "/driver/route",
        component: DriverRoute,
        meta: { driver: true },
      },
      // Path manager
      {
        path: "/manager/route/send",
        component: ManagerRouteSend,
        meta: { manager: true },
      },
      // Path carrier
      {
        path: "/carrier/route",
        component: CarrierRoute,
        meta: { carrier: true },
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
  if (store.getters["isLogin"]) {
    if (to.matched.some((record) => record.meta.admin)) {
      if (store.getters["type"] === "administrador") {
        ok = true;
      } else {
        ok = false;
        const paths = {
          administrador: "/admin/dashboard",
          conductor: "/driver/vehicle",
          gerente: "/manager/route/send",
          transportador: "/carrier/route",
        };
        path = paths[store.getters["type"]];
      }
    }
    if (to.matched.some((record) => record.meta.driver)) {
      if (store.getters["type"] === "conductor") {
        ok = true;
      } else {
        ok = false;
        path = "/";
      }
    }
    if (to.matched.some((record) => record.meta.manager)) {
      if (store.getters["type"] === "gerente") {
        ok = true;
      } else {
        ok = false;
        path = "/";
      }
    }
    if (to.matched.some((record) => record.meta.carrier)) {
      if (store.getters["type"] === "transportador") {
        ok = true;
      } else {
        ok = false;
        path = "/";
      }
    }
  }
  if (ok) {
    next();
  } else {
    next({ path });
  }
});

const vfm = createVfm();
createApp(App)
  .use(router)
  .use(store)
  .use(vfm)
  .use(VueCookies, { expires: "7d" })
  .mount("#app");
