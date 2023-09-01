<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
        :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
      >
        <div class="rounded-t mb-0 px-4 py-3 border-0">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                class="font-semibold text-lg"
                :class="[
                  color === 'light' ? 'text-blueGray-700' : 'text-white',
                ]"
              >
                Vehiculos blindados
              </h3>
            </div>
          </div>
        </div>
        <hr class="my-4 md:min-w-full border-gray-300" />
        <div class="w-full px-12 flex flex-wrap gap-2 justify-between">
          <div class="relative flex flex-wrap items-stretch mb-3">
            <label
              class="py-2 text-sm font-normal text-blueGray-600 mr-2"
              for="items"
              >Numero de items</label
            >
            <select
              v-model="itemsPerPage"
              class="relative bg-white rounded text-sm border border-gray-300 outline-none focus:outline-none focus:shadow-outline w-auto px-4 pr-10"
              name="items"
              id="items"
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>

          <form
            class="relative flex flex-wrap items-stretch mb-3"
            :onSubmit="searchItems"
          >
            <span
              class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-2"
            >
              <i class="fas fa-search"></i>
            </span>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Buscar"
              class="px-2 py-1 placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10"
            />
          </form>
          <div class="relative flex flex-wrap items-stretch mb-3">
            <router-link to="/admin/addVehicle" v-slot="{ href, navigate }">
              <a :href="href" @click="navigate">
                <button
                  class="bg-grayBlue-800 text-sm border border-gray-300 px-2 py-2 rounded-md"
                >
                  Agregar vehiculo
                  <i class="fas fa-plus text-sm ml-2"></i>
                </button>
              </a>
            </router-link>
          </div>
        </div>

        <hr class="my-4 md:min-w-full border-gray-300" />
        <Table
          :items="itemsDisplay"
          :load="load"
          :columns="columnas"
          :options="options"
          :itemsPerPage="itemsPerPage"
          @action="action"
        />

        <vue-final-modal
          v-model="uploadVehicle"
          class="flex justify-center items-center"
          content-class="w-2/3 max-h-3/4 p-4 bg-white rounded-lg shadow "
        >
          <!-- Modal header -->
          <div class="flex items-start justify-between p-4 border-b rounded-t">
            <h3 class="text-xl font-semibold text-gray-900">
              Cargar imagen de vehiculo
            </h3>
            <button
              type="button"
              @click="uploadVehicle = false"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
            >
              <i class="fas fa-close"></i>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <form :onSubmit="uploadImage">
            <div class="p-6 space-y-6">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Imagen
                </label>
                <input
                  type="file"
                  @change="handleFileChange"
                  name="image"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div
              class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b"
            >
              <button
                type="sumbit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Guardar <i class="fas fa-save"></i>
              </button>
              <button
                type="button"
                @click="uploadVehicle = false"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
              >
                Cancelar
              </button>
            </div>
          </form>
        </vue-final-modal>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Tables/Table.vue";
import { VueFinalModal } from "vue-final-modal";
import {
  getVehiclesRequest,
  uploadVehicleRequest,
  getVehicleRequest,
} from "../../api/vehicle";
import axios from "../../api/axios";
export default {
  data() {
    return {
      viewVehicle: false,
      uploadVehicle: false,
      items: [],
      itemsDisplay: [],
      itemsPerPage: 10,
      searchQuery: "",
      status: "all",
      color: "light",
      load: true,
      columnas: [
        { key: "id", label: "ID" },
        { key: "model", label: "Modelo" },
        { key: "plate", label: "Placa" },
        { key: "driver", label: "Conductor" },
        { key: "createdAt", label: "Creado", date: true },
      ],
      options: [
        { id: "update", name: "Actualizar", icon: "fas fa-plus" },
        { id: "upload", name: "Cargar foto", icon: "fas fa-upload" },
        {
          id: "fueling",
          name: "Cargas de combustible",
          icon: "fas fa-gas-pump",
        },
        {
          id: "maintenance",
          name: "Manteniemiento",
          icon: "fas fa-wrench",
        },
      ],
      vehicle: {},
      vehicleId: null,
      selectedFile: null,
    };
  },
  components: {
    Table,
    VueFinalModal,
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.load = true;
      try {
        const res = await getVehiclesRequest();
        this.items = res.data;
        this.itemsDisplay = this.items;
        this.load = false;
      } catch (error) {
        console.log(error);
      }
    },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadImage(event) {
      event.preventDefault();
      if (!this.selectedFile) return alert("Please select a file");
      const formData = new FormData();
      formData.append("image", this.selectedFile);
      try {
        await uploadVehicleRequest(this.vehicleId, formData);
        alert("Imagen subida exitosamente");
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      }
    },
    searchItems(event) {
      if (event) event.preventDefault();
      const filteredItems = this.items.filter(
        (item) =>
          item.plate.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.model.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.driver.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.itemsDisplay = filteredItems;
    },
    async action(action) {
      if (action.action === "update") {
        this.$router.push({
          path: "/admin/updateVehicle",
          query: { id: action.id },
        });
      } else if (action.action === "maintenance") {
        this.$router.push({
          path: "/admin/maintenance/" + action.id,
        });
      } else if (action.action === "upload") {
        this.uploadVehicle = true;
        this.vehicleId = action.id;
      } else if (action.action === "fueling") {
        this.$router.push({
          path: "/admin/fueling/" + action.id,
        });
      }
    },
  },
};
</script>
