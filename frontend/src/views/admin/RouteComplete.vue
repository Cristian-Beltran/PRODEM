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
                Rutas Completas
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
      </div>
    </div>
  </div>
</template>
<script>
import Table from "@/components/Tables/Table.vue";
import { getRouteRequest, getRoutesCompleteRequest } from "../../api/route";
import { VueFinalModal } from "vue-final-modal";

export default {
  data() {
    return {
      items: [],
      itemsDisplay: [],
      itemsPerPage: 10,
      searchQuery: "",
      status: "all",
      color: "light",
      load: true,
      modal: false,
      columnas: [
        { key: "id", label: "ID" },
        { key: "carrier1", label: "Transportista 1" },
        { key: "carrier2", label: "Transportista 2" },
        { key: "guard1", label: "Guardia 1" },
        { key: "guard2", label: "Guardia 2" },
        { key: "driver", label: "Conductor" },
        { key: "vehicle", label: "Vehiculo" },
        { key: "createdAt", label: "Creado", date: true },
      ],
      options: [{ id: "view", name: "Ver informacion", icon: "fas fa-folder" }],
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
        const res = await getRoutesCompleteRequest1();
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
          item.guard1.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.guard2.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.vehicle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.itemsDisplay = filteredItems;
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
    async action(action) {
      if (action.action === "view") {
        this.$router.push({
          path: "/admin/viewRoute",
          query: { id: action.id },
        });
      }
    },
  },
};
</script>
