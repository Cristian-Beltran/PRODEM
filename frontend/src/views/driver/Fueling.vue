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
                Cargas de vehiculo Blindado
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
            <router-link
              :to="'/driver/addFueling/'"
              v-slot="{ href, navigate }"
            >
              <a :href="href" @click="navigate">
                <button
                  class="bg-grayBlue-800 text-sm border border-gray-300 px-2 py-2 rounded-md"
                >
                  Agregar carga nueva de combustible
                  <i class="fas fa-plus text-sm ml-2"></i>
                </button>
              </a>
            </router-link>
          </div>
        </div>
        <div class="w-full px-12 flex flex-wrap gap-2 justify-between">
          <div class="relative flex flex-wrap items-stretch mb-3">
            <label
              class="py-2 text-sm font-normal text-blueGray-600 mr-2"
              for="items"
              >Mes</label
            >
            <select
              v-model="month"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
              name="items"
              id="items"
            >
              <option value="all" selected>Todos</option>
              <option value="1">Enero</option>
              <option value="2">Febrero</option>
              <option value="3">Marzo</option>
              <option value="4">Abril</option>
              <option value="5">Mayo</option>
              <option value="6">Junio</option>
              <option value="7">Julio</option>
              <option value="8">Agosto</option>
              <option value="9">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
          </div>
          <div class="relative flex flex-wrap items-stretch mb-3">
            <label
              class="py-2 text-sm font-normal text-blueGray-600 mr-2"
              for="items"
              >Año</label
            >
            <select
              v-model="year"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
              name="items"
              id="items"
            >
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
            </select>
          </div>
        </div>

        <hr class="my-4 md:min-w-full border-gray-300" />
        <Table
          :items="itemsDisplay"
          :load="load"
          :columns="columnas"
          :itemsPerPage="itemsPerPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Tables/Table.vue";

import { getFuelingsByDriverRequest } from "../../api/fueling";

export default {
  data() {
    return {
      viewVehicle: false,
      uploadVehicle: false,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      items: [],
      itemsDisplay: [],
      itemsPerPage: 10,
      searchQuery: "",
      status: "all",
      color: "light",
      load: true,
      columnas: [
        { key: "id", label: "ID" },
        { key: "nInvoce", label: "N Factura" },
        { key: "partialFull", label: "Tipo de llenado" },
        { key: "price", label: "Precio" },
        { key: "liters", label: "Litros" },
        { key: "fuelType", label: "Tipo de combustible" },
        { key: "driver", label: "Conductor" },
        { key: "total", label: "Total" },
        { key: "createdAt", label: "Creado", date: true },
      ],
    };
  },
  components: {
    Table,
  },
  watch: {
    month() {
      this.loadData();
    },
    year() {
      this.loadData();
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.load = true;
      try {
        const query = `month=${this.month}&year=${this.year}`;
        const res = await getFuelingsByDriverRequest(query);
        this.items = res.data;
        this.itemsDisplay = this.items;
        this.load = false;
      } catch (error) {
        console.log(error);
      }
    },
    searchItems(event) {
      if (event) event.preventDefault();
      const filteredItems = this.items.filter(
        (item) =>
          item.driver.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.fuelType
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          item.nInvoce.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.itemsDisplay = filteredItems;
    },
  },
};
</script>
