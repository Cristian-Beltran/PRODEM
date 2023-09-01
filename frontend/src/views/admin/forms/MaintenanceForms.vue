<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
      >
        <div class="rounded-t bg-white mb-0 px-6 py-6">
          <div class="text-center flex justify-between">
            <h6 class="text-blueGray-700 text-xl font-bold">
                Mantenimiento de vehiculo             
            </h6>
          </div>
        </div>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form :onSubmit="handleSubmit">
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Datos de mantenimiento
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
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Numero de factura
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.nInvoce.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <input
                    v-model="v$.formData.nInvoce.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Llenado parcial o completo
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.partialFull.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <select
                    v-model="v$.formData.partialFull.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="" selected>Seleccione una opcion</option>
                    <option value="Parcial">Parcial</option>
                    <option value="Completo">Completo</option>
                  </select>
                </div>
              </div>

              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Kilometraje inicial
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.kmStart.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <input
                    type="number"
                    v-model="v$.formData.kmStart.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Kilometraje final
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.kmEnd.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <input
                    type="number"
                    v-model="v$.formData.kmEnd.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Precio de combustible
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.price.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <input
                    type="number"
                    step="any"
                    v-model="v$.formData.price.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Litros de combustible
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.liters.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <input
                    type="number"
                    step="any"
                    v-model="v$.formData.liters.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Tipo de combustible
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.fuelType.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <select
                    v-model="v$.formData.fuelType.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="" selected>Seleccione una opcion</option>
                    <option value="Gasolina 90">Gasolina 90</option>
                    <option value="Gasolina 84">Gasolina 84</option>
                    <option value="Diesel">Diesel</option>
                  </select>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Tipo de Ruta
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.typeOfRoad.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <select
                    v-model="v$.formData.typeOfRoad.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="" selected>Seleccione una opcion</option>
                    <option value="Carretera" selected>Carretera</option>
                    <option value="Pista" selected>Pista</option>
                    <option value="Ciudad" selected>Ciudad</option>
                  </select>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Conductor
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.driverId.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <select
                    v-model="v$.formData.driverId.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="" selected>Seleccione una opcion</option>
                    <option
                      v-for="item in drivers"
                      :value="item.driverId"
                      :key="item.driverId"
                    >
                      {{ item.first_name }} {{ item.last_name }}
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
                    Observaciones
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.obvservations.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <textarea
                    rows="4"
                    v-model="v$.formData.obvservations.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  ></textarea>
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

import { getDriversRequest } from "../../../api/driver";

import {
  createFuelingRequest,
  updateFuelingRequest,
  getFuelingRequest,
} from "../../../api/fueling";

export default {
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      formData: {
        nInvoce: "",
        partialFull: "",
        kmStart: "",
        kmEnd: "",
        price: "",
        liters: "",
        fuelType: "",
        typeOfRoad: "",
        obvservations: "",
        driverId: "",
      },
      errors: [],
      drivers: [],
      alertOpen: false,
    };
  },
  validations() {
    return {
      formData: {
        nInvoce: {
          required: helpers.withMessage("Campo requerido", required),
        },
        partialFull: {
          required: helpers.withMessage("Campo requerido", required),
        },
        kmStart: {
          required: helpers.withMessage("Campo requerido", required),
        },
        kmEnd: {
          required: helpers.withMessage("Campo requerido", required),
        },
        price: {
          required: helpers.withMessage("Campo requerido", required),
        },
        liters: {
          required: helpers.withMessage("Campo requerido", required),
        },
        fuelType: {
          required: helpers.withMessage("Campo requerido", required),
        },
        typeOfRoad: {
          required: helpers.withMessage("Campo requerido", required),
        },
        obvservations: {
          required: helpers.withMessage("Campo requerido", required),
        },
        driverId: {
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
            if (!this.$route.query.id) {
              this.formData.vehicleId = this.$route.params.id;
              await createFuelingRequest(this.formData);
            } else
              await updateFuelingRequest(this.$route.query.id, this.formData);
            this.$router.go(-1);
          } catch (error) {
            this.errors = error.response.data.errors;
            this.notification();
          }
        };
        request();
      }
    },
  },
  async created() {
    const res = await getDriversRequest();
    this.drivers = res.data;
    if (this.$route.query.id) {
      const res = await getFuelingRequest(this.$route.query.id);
      this.formData = res.data;
    }
  },
};
</script>
