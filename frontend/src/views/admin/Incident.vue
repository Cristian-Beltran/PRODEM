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
                Incidentes registrados
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
            <router-link to="/admin/addIncident" v-slot="{ href, navigate }">
              <a :href="href" @click="navigate">
                <button
                  class="bg-grayBlue-800 text-sm border border-gray-300 px-2 py-2 rounded-md"
                >
                  Agregar incidente
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
              >Prioridad</label
            >
            <select
              v-model="priority"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
              name="items"
              id="items"
            >
              <option value="all" selected>Todos</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>
          <div class="relative flex flex-wrap items-stretch mb-3">
            <label
              class="py-2 text-sm font-normal text-blueGray-600 mr-2"
              for="items"
              >Completo</label
            >
            <select
              v-model="status"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
              name="items"
              id="items"
            >
              <option value="all" selected>Todos</option>
              <option value="0">Incompleto</option>
              <option value="1">Completo</option>
            </select>
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
      </div>
    </div>
  </div>
</template>
<script>
import Table from "@/components/Tables/Table.vue";
import {
  completeIncidentRequest,
  getIncidentsRequest,
} from "../../api/incident";

export default {
  data() {
    return {
      items: [],
      itemsDisplay: [],
      itemsPerPage: 10,
      searchQuery: "",
      priority: "all",
      status: "all",
      color: "light",
      load: true,
      columnas: [
        { key: "id", label: "ID" },
        { key: "description", label: "Descripcion" },
        { key: "priority", label: "Prioridad" },
        { key: "completedAt", label: "fecha de completado", date: true },
        { key: "status", label: "Completo?", check: true },
        { key: "createdAt", label: "Creado", date: true },
      ],
      options: [
        { id: "update", name: "Actualizar", icon: "fas fa-plus" },
        {
          id: "completeIncident",
          name: "Incendete concluido",
          icon: "fas fa-check",
        },
      ],
    };
  },
  components: {
    Table,
  },
  created() {
    this.loadData();
  },
  watch: {
    priority() {
      this.searchItems();
    },
    status() {
      this.searchItems();
    },
  },
  methods: {
    async loadData() {
      this.load = true;
      try {
        const res = await getIncidentsRequest();
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
          item.description
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) &&
          (this.priority === "all" || item.priority == this.priority) &&
          (this.status === "all" || item.status == this.status)
      );
      this.itemsDisplay = filteredItems;
    },
    async action(action) {
      if (action.action === "update") {
        this.$router.push({
          path: "/admin/updateIncident",
          query: { id: action.id },
        });
      } else if (action.action === "completeIncident") {
        try {
          await completeIncidentRequest(action.id);
          this.items = [];
          this.loadData();
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>
