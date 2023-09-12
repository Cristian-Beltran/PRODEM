<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
      >
        <div class="rounded-t bg-white mb-0 px-6 py-6">
          <div class="text-center flex justify-between">
            <h6 class="text-blueGray-700 text-xl font-bold">Ruta</h6>
          </div>
        </div>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form :onSubmit="handleSubmit">
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Datos de ruta
            </h6>
            <div v-if="alertOpen">
              <div
                v-for="(item, index) in errors"
                :key="index"
                className="bg-red-500 p-2 text-white rounded-lg mb-2 text-center"
              >
                {{ item }}
              </div>
            </div>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Vehiculo
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.vehicleId.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <select
                    v-model="v$.formData.vehicleId.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="" selected>Seleccione una opcion</option>
                    <option
                      v-for="item in vehicles"
                      :value="item.id"
                      :key="item.id"
                    >
                      {{ item.model }}
                      {{ item.plate }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Guardia 1
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.guard1.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <select
                    v-model="v$.formData.guard1.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="" selected>Seleccione una opcion</option>
                    <option
                      v-for="item in guards"
                      :value="item.id"
                      :key="item.id"
                    >
                      {{ item.first_name }}
                      {{ item.last_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Guardia 2
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.guard2.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <select
                    v-model="v$.formData.guard2.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="" selected>Seleccione una opcion</option>
                    <option
                      v-for="item in guards"
                      :value="item.id"
                      :key="item.id"
                    >
                      {{ item.first_name }}
                      {{ item.last_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Transportista de valor 1
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.carriesValue1.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <select
                    v-model="v$.formData.carriesValue1.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="" selected>Seleccione una opcion</option>
                    <option
                      v-for="item in carries"
                      :value="item.id"
                      :key="item.id"
                    >
                      {{ item.first_name }}
                      {{ item.last_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Transportista de valor 2
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.carriesValue2.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <select
                    v-model="v$.formData.carriesValue2.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="" selected>Seleccione una opcion</option>
                    <option
                      v-for="item in carries"
                      :value="item.id"
                      :key="item.id"
                    >
                      {{ item.first_name }}
                      {{ item.last_name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3">
                  <div class="mt-2">
                    <table class="w-full text-sm text-left text-gray-500">
                      <thead class="text-xs text-gray-50 uppercase bg-gray-700">
                        <tr>
                          <th scope="col" class="px-6 py-3">Agregar</th>
                          <th scope="col" class="px-6 py-3">Id</th>
                          <th scope="col" class="px-6 py-3">
                            Paf que ordeno el servicio
                          </th>
                          <th scope="col" class="px-6 py-3">Paf remitente</th>
                          <th scope="col" class="px-6 py-3">Pedido</th>
                          <th scope="col" class="px-6 py-3">
                            Tipo de servicio
                          </th>
                          <th scope="col" class="px-6 py-3">Sub tipo</th>
                          <th scope="col" class="px-6 py-3">creado</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in remesas"
                          :key="item.id"
                          class="border-b bg-gray-800 border-gray-700"
                          @click="item.check = !item.check"
                        >
                          <th class="px-6 py-4">
                            <input v-model="item.check" type="checkbox" />
                          </th>
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium whitespace-nowrap text-white"
                          >
                            {{ item.id }}
                          </th>

                          <th class="px-6 py-4">{{ item.addressee }}</th>
                          <th class="px-6 py-4">{{ item.sender }}</th>
                          <th class="px-6 py-4">{{ item.order }}</th>
                          <th class="px-6 py-4">{{ item.typeOfService }}</th>
                          <th class="px-6 py-4">{{ item.subType }}</th>
                          <th class="px-6 py-4">{{ date(item.createdAt) }}</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full mx-auto p-4 md:py-8">
              <div class="flex items-center justify-between">
                <div class="text-center flex items-center mb-4">
                  <button
                    @click="$router.go(-1)"
                    class="bg-blue-900 text-white active:bg-blue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <span><i class="fas fa-arrow-left"></i> Atras</span>
                  </button>
                </div>
                <div class="text-center flex items-center mb-4">
                  <button
                    class="bg-blue-900 text-white active:bg-blue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    <span>Guardar <i class="fas fa-save"></i></span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import {
  getRouteRequest,
  createRouteRequest,
  updateRouteRequest,
} from "../../../api/route";

import { getRemesasRouteRequest } from "../../../api/remesa";

import { getVehiclesRequest } from "../../../api/vehicle";
import { getUsersRequest } from "../../../api/user";

export default {
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      formData: {
        vehicleId: "",
        guard1: "",
        guard2: "",
        carriesValue1: "",
        carriesValue2: "",
      },
      errors: [],
      guards: [],
      drivers: [],
      carries: [],
      alertOpen: false,
      remesas: [],
    };
  },
  validations() {
    return {
      formData: {
        vehicleId: {
          required: helpers.withMessage("Campo requerido", required),
        },
        guard1: {
          required: helpers.withMessage("Campo requerido", required),
        },
        guard2: {
          required: helpers.withMessage("Campo requerido", required),
        },
        carriesValue1: {
          required: helpers.withMessage("Campo requerido", required),
        },
        carriesValue2: {
          required: helpers.withMessage("Campo requerido", required),
        },
      },
    };
  },
  methods: {
    notification() {
      this.alertOpen = true;
      const timer = setTimeout(() => {
        this.alertOpen = false;
      }, 3000);
      return () => clearTimeout(timer);
    },
    handleSubmit(event) {
      event.preventDefault();
      this.v$.$touch();
      if (!this.v$.$invalid) {
        const request = async () => {
          try {
            this.formData.remesas = this.remesas;
            console.log(this.formData)
            if (this.$route.query.id)
              await updateRouteRequest(this.$route.query.id, this.formData);
            else await createRouteRequest(this.formData);
            this.$router.go(-1);
          } catch (error) {
            this.errors = error.response.data.errors;
            this.notification();
          }
        };
        request();
      }
    },
    date(value) {
      if (!value) return "";
      var date = new Date(value);
      function agregarCeros(numero) {
        return numero < 10 ? "0" + numero : numero;
      }
      var ano = date.getFullYear();
      var mes = agregarCeros(date.getMonth() + 1);
      var dia = agregarCeros(date.getDate());
      var hora = agregarCeros(date.getHours());
      var minuto = agregarCeros(date.getMinutes());
      var dateFormat = ano + "-" + mes + "-" + dia + " " + hora + ":" + minuto;
      return dateFormat;
    },
  },
  async created() {
    const guards = await getUsersRequest("guardia");
    const carries = await getUsersRequest("transportador");
    const vehicles = await getVehiclesRequest();
    this.guards = guards.data;
    this.carries = carries.data;
    this.vehicles = vehicles.data;
    const remesas = await getRemesasRouteRequest(
      this.$route.query.id ? this.$route.query.id : 0
    );
    this.remesas = remesas.data;
    if (this.$route.query.id) {
      const res = await getRouteRequest(this.$route.query.id);
      this.formData = res.data;
    }
  },
};
</script>
