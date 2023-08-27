<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
      >
        <div class="rounded-t bg-white mb-0 px-6 py-6">
          <div class="text-center flex justify-between">
            <h6 class="text-blueGray-700 text-xl font-bold">PAF</h6>
          </div>
        </div>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form :onSubmit="handleSubmit">
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Datos de Paf
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
                    Nombre de PAF
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.name.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <input
                    v-model="v$.formData.name.$model"
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
                    Direccion de PAF
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.address.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <input
                    v-model="v$.formData.address.$model"
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
                    Tipo de PAF
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.type.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <select
                    v-model="v$.formData.type.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="" selected>Seleccione una opcion</option>
                    <option value="Tesoreria">Tesoreria</option>
                    <option value="Ventanilla">Ventanilla</option>
                    <option value="Agencia">Agencia</option>
                    <option value="Cajero">Cajero</option>
                  </select>
                </div>
              </div>

              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Gerente de PAF
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.manager.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <select
                    v-model="v$.formData.manager.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="" selected>Seleccione una opcion</option>
                    <option
                      v-for="item in managers"
                      :value="item.id"
                      :key="item.id"
                    >
                      {{ item.first_name }} {{ item.last_name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <hr class="mt-6 border-b-1 border-blueGray-300" />

            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Ubicacion
            </h6>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3">
                  <div id="map" style="height: 400px"></div>
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
  createPafRequest,
  getPafRequest,
  updatePafRequest,
} from "../../../api/paf";
import { getManagerPafRequest, getManagersPafRequest } from "../../../api/user";

export default {
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      formData: {
        lat: -16.489689,
        log: -68.119293,
        name: "",
        address: "",
        type: "",
        manager: "",
      },
      errors: [],
      managers: [],
      alertOpen: false,
    };
  },
  validations() {
    return {
      formData: {
        name: {
          required: helpers.withMessage("Campo requerido", required),
        },
        address: {
          required: helpers.withMessage("Campo requerido", required),
        },
        type: {
          required: helpers.withMessage("Campo requerido", required),
        },
        manager: {
          required: helpers.withMessage("Campo requerido", required),
        },
        log: {},
        lat: {},
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
              await createPafRequest(this.formData);
            } else await updatePafRequest(this.$route.query.id, this.formData);
            this.$router.go(-1);
          } catch (error) {
            this.errors = error.response.data.errors;
            this.notification();
          }
        };
        request();
      }
    },
    initMap() {
      // Inicializar el mapa de Google usando la API Key
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.formData.lat, lng: this.formData.log },
        zoom: 12,
      });

      // Agregar un marcador que se puede mover en el mapa
      this.marker = new google.maps.Marker({
        position: { lat: this.formData.lat, lng: this.formData.log },
        map: this.map,
        draggable: true,
      });

      // Actualizar las coordenadas cuando se mueve el marcador
      this.marker.addListener("dragend", () => {
        console.log(this.formData);
        const position = this.marker.getPosition();
        this.formData.lat = position.lat();
        this.formData.log = position.lng();
      });
    },
  },
  async created() {
    if (this.$route.query.id) {
      const res = await getPafRequest(this.$route.query.id);
      const managers = await getManagerPafRequest(res.data.manager);
      this.managers = managers.data;
      console.log(res.data);
      this.formData = res.data;
      this.formData.lat = parseFloat(res.data.lat);
      this.formData.log = parseFloat(res.data.log);
    } else {
      const res = await getManagersPafRequest(0);
      console.log(res.data);
      this.managers = res.data;
    }

    this.initMap();
  },
};
</script>
