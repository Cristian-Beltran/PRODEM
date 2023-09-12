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
                    Contenido
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.content.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <input
                    v-model="v$.formData.content.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    list="dataContent"
                  />
                  <datalist id="dataContent">
                    <option value="Billetes"></option>
                    <option value="Monedas"></option>
                    <option value="Cheques"></option>
                  </datalist>
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
                    v-for="(error, index) of v$.formData.observations.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <textarea
                    v-model="v$.formData.observations.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                  </textarea>
                </div>
              </div>
              <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3">
                  <div
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Bolsas
                    <button
                      @click="addBag"
                      class="bg-blue-500 text-white px-4 py-2 rounded ml-4"
                      type="button"
                    >
                      Agregar Bolsa
                    </button>
                  </div>

                  <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-x text-gray-50 uppercase bg-gray-700">
                      <tr>
                        <th class="px-6 py-3">Serial</th>
                        <th class="px-6 py-3">Cantidad</th>
                        <th class="px-6 py-3">Moneda</th>
                        <th class="px-6 py-3">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="border-b bg-gray-800 border-gray-700"
                        v-for="(bag, index) in bags"
                        :key="index"
                      >
                        <td class="px-6 py-4">
                          <input
                            v-model="bag.serial"
                            class="rounded px-2 py-1 bg-gray-200"
                          />
                        </td>
                        <td class="px-6 py-4">
                          <input
                            type="number"
                            v-model="bag.amount"
                            class="rounded px-2 py-1 bg-gray-200"
                          />
                        </td>
                        <td class="px-6 py-4">
                          <input
                            v-model="bag.type"
                            class="rounded px-2 py-1 bg-gray-200"
                            list="money"
                          />
                        </td>
                        <td class="px-6 py-4">
                          <button
                            @click="deleteBag(index)"
                            class="bg-red-500 text-white px-2 py-1 rounded"
                            type="button"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <datalist id="money">
                    <option value="BOLIVIANOS"></option>
                    <option value="DÓLARES"></option>
                  </datalist>
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
  updateRemesaByManagerRequest,
} from "../../../api/remesa";

import { getPafsRequest } from "../../../api/paf";

export default {
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      formData: {
        content: "",
        observations: "",
      },
      bags: [],
      newBag: {
        serial: "",
        amount: 0,
        type: "",
      },
      errors: [],
      pafs: [],
      updateIndex: null,
      alertOpen: false,
    };
  },
  validations() {
    return {
      formData: {
        content: {
          required: helpers.withMessage("Campo requerido", required),
        },
        observations: {
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
              this.formData.bags = this.bags;
              await updateRemesaByManagerRequest(
                this.$route.query.id,
                this.formData
              );
            }
            this.$router.go(-1);
            console.log(this.formData);
          } catch (error) {
            this.errors = error.response.data.errors;
            this.notification();
          }
        };
        request();
      }
    },
    addBag() {
      this.bags.push({ ...this.newBag });
      this.newBag.nombre = "";
      this.newBag.cantidad = 0;
    },
    updateBag(index) {
      this.updateIndex = index;
    },
    deleteBag(index) {
      this.bags.splice(index, 1);
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
      this.bags = this.formData.bags;
    }
  },
};
</script>
