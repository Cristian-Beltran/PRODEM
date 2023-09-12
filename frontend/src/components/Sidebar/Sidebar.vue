<template>
  <nav
    class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-blue-900 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
  >
    <div
      class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
    >
      <!-- Toggler -->
      <button
        class="cursor-pointer text-white opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
        type="button"
        v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
      >
        <i class="fas fa-bars"></i>
      </button>
      <!-- Brand -->
      <router-link
        class="md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
        to="/"
      >
        <div class="lg:hidden">Banco prodem</div>
        <div class="hidden lg:block">
          <img :src="logo" alt="" class="w-full h-auto" />
        </div>
      </router-link>
      <!-- User -->
      <ul class="md:hidden items-center flex flex-wrap list-none">
        <li class="inline-block relative">
          <user-dropdown />
        </li>
      </ul>
      <!-- Collapse -->
      <div
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
        v-bind:class="collapseShow"
      >
        <!-- Collapse header -->
        <div class="md:min-w-full md:hidden block pb-4 mb-4">
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <router-link
                class="md:block text-left md:pb-2 text-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                to="/"
              >
                Home
              </router-link>
            </div>
            <div class="w-6/12 flex justify-end">
              <button
                type="button"
                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                v-on:click="toggleCollapseShow('hidden')"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>

        <h6
          class="md:min-w-full text-gray-400 lg:text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
        >
          Rol: {{ $store.getters.type }}
        </h6>
        <!-- Menu de administrador-->
        <ul
          v-if="$store.getters.type == 'administrador'"
          class="md:flex-col md:min-w-full flex flex-col list-none"
        >
          <!-- Divider -->
          <hr class="my-4 md:min-w-full" />
          <!-- Heading -->
          <h6
            class="md:min-w-full text-gray-400 lg:text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
          >
            Personal
          </h6>
          <li class="items-center">
            <router-link
              to="/admin/admin"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-user-cog mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Administradores
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link
              to="/admin/manager"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-user-tie mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Gerentes
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link
              to="/admin/driver"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-truck mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Conductores
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link
              to="/admin/carrier"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-user-alt mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Transportadores de valor
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link
              to="/admin/guard"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-user-shield mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Guardias
              </a>
            </router-link>
          </li>
          <hr class="my-4 md:min-w-full" />
          <h6
            class="md:min-w-full text-gray-400 lg:text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
          >
            Transporte
          </h6>

          <li class="items-center">
            <router-link to="/admin/paf" v-slot="{ href, navigate, isActive }">
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-university mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                PAF
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link
              to="/admin/remesa"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-file-import mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Remesas
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link
              to="/admin/remesa/complete"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-check mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Remesas completas
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link
              to="/admin/route"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-route mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Rutas
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link
              to="/admin/route/complete"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-check mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Rutas completas
              </a>
            </router-link>
          </li>
          <hr class="my-4 md:min-w-full" />
          <h6
            class="md:min-w-full text-gray-400 lg:text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
          >
            Vehiculos
          </h6>

          <li class="items-center">
            <router-link
              to="/admin/vehicle"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-truck mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Vehiculos
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link
              to="/admin/verify"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-eye mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Verificaciones
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link
              to="/admin/incident"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-exclamation-triangle mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Incidentes
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link
              to="/admin/maintenanceType"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-wrench mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Tipos de mantenimiento
              </a>
            </router-link>
          </li>
        </ul>
        <!-- Menu de conductor -->
        <ul
          v-if="$store.getters.type == 'conductor'"
          class="md:flex-col md:min-w-full flex flex-col list-none"
        >
          <li class="items-center">
            <router-link
              to="/driver/vehicle"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-truck mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Vehiculo
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link
              to="/driver/fueling"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-gas-pump mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Carga de combustible
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link
              to="/driver/maintenance"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-wrench mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Mantenimiento
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link
              to="/driver/verify"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-eye mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Verificaciones
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link
              to="/driver/route"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-route mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Rutas asignadas
              </a>
            </router-link>
          </li>
        </ul>

        <!-- Menu de gerentes -->
        <ul
          v-if="$store.getters.type == 'gerente'"
          class="md:flex-col md:min-w-full flex flex-col list-none"
        >
          <li class="items-center">
            <router-link
              to="/manager/remesa/sender"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-sign-out-alt mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Envios de remesas
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link
              to="/manager/remesa/receive"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-sign-in-alt mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Pedidos de remesas
              </a>
            </router-link>
          </li>
          <li class="items-center">
            <router-link
              to="/manager/remesa/complete"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-check mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Remesas completas
              </a>
            </router-link>
          </li>
        </ul>
        <!-- Menu de transportador de valor -->
        <ul
          v-if="$store.getters.type == 'transportador'"
          class="md:flex-col md:min-w-full flex flex-col list-none"
        >
          <li class="items-center">
            <router-link
              to="/carrier/route"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="
                  () => {
                    navigate;
                    collapseShow = 'hidden';
                  }
                "
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-600 hover:text-green-400'
                    : 'text-gray-400 hover:text-white ',
                ]"
              >
                <i
                  class="fas fa-truck mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Rutas pendientes
              </a>
            </router-link>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";
import logo from "@/assets/img/Logo.png";

export default {
  data() {
    return {
      collapseShow: "hidden",
      logo,
    };
  },
  methods: {
    toggleCollapseShow: function (classes) {
      this.collapseShow = classes;
    },
  },
  components: {
    UserDropdown,
  },
};
</script>
