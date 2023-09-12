<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
      >
        <div class="rounded-t bg-white mb-0 px-6 py-6">
          <div class="text-center flex justify-between">
            <h6 class="text-blueGray-700 text-xl font-bold">Remesa</h6>
          </div>
        </div>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form :onSubmit="handleSubmit">
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Datos de remesa
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
                    Pedido 
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.order.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <select
                    v-model="v$.formData.order.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="" elected>Seleccione una opción</option>
                    <option value="Programada">Programada</option>
                    <option value="No programada">No programada</option>
                  </select>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Tipo de servicio
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.typeOfService.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <select
                    v-model="v$.formData.typeOfService.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="" elected>Seleccione una opción</option>
                    <option value="ENTREGA DE ATEV">Entrega de ATEV</option>
                    <option value="RECOJO CUSTODIA Y ENTREGA">
                      Recojo custodia y entrega
                    </option>
                    <option value="ENTREGA DIRECTA">Entrega directa</option>
                  </select>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Subtipo de servicio
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.subType.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <select
                    v-model="v$.formData.subType.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="" elected>Seleccione una opción</option>
                    <option value="Aerea">Aerea</option>
                    <option value="Terrestre">Terrestre</option>
                    <option value="A pie">A pie</option>
                  </select>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Paf remitente
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.order.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <select
                    v-model="v$.formData.sender.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="" selected>Seleccione una opcion</option>
                    <option
                      v-for="item in pafs"
                      :value="item.id"
                      :key="item.id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
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
import { required, helpers, minLength, email } from "@vuelidate/validators";
import {
  getRemesaRequest,
  updateRemesaByAdminRequest,
} from "../../../api/remesa";

import { getPafsRequest } from "../../../api/paf";

export default {
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      formData: {
        order: "",
        typeOfService: "",
        subType: "",
        sender: "",
      },
      errors: [],
      pafs: [],
      alertOpen: false,
    };
  },
  validations() {
    return {
      formData: {
        order: {
          required: helpers.withMessage("Campo requerido", required),
        },
        typeOfService: {
          required: helpers.withMessage("Campo requerido", required),
        },
        subType: {
          required: helpers.withMessage("Campo requerido", required),
        },
        sender: {
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
            if (this.$route.query.id) {
              await updateRemesaByAdminRequest(
                this.$route.query.id,
                this.formData
              );
            }
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
    if (!this.$route.query.id) this.$router.go(-1);
    if (this.$route.query.id) {
      const res = await getRemesaRequest(this.$route.query.id);
      this.formData = res.data;
      Object.keys(this.formData).forEach((key) => {
        if (this.formData[key] === null) {
          this.formData[key] = "";
        }
      });
      const pafs = await getPafsRequest();
      this.pafs = pafs.data.filter(
        (item) => item.id !== this.formData.addressee
      );
    }
  },
};
</script>
