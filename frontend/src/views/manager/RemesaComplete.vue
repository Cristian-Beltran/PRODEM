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
                Remesas completeas
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
    <vue-final-modal
      v-model="modal"
      class="flex justify-center items-center"
      content-class="w-2/3 max-h-3/4 p-4 bg-white rounded-lg shadow "
    >
      <!-- Modal header -->
      <div class="flex items-start justify-between p-4 border-b rounded-t">
        <h3 class="text-xl font-semibold text-gray-900">
          Informacion de Remesa
        </h3>
        <button
          type="button"
          @click="modal = false"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
        >
          <i class="fas fa-close"></i>
          <span class="sr-only">Close modal</span>
        </button>
      </div>
      <!-- Modal body -->
      <div class="p-6">
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 p-2">
            <h2 class="font-bold text-lg">
              Informacion de paf que pidio el servicio
            </h2>
            <div class="text-gray-800">
              <p><strong>Nombre:</strong> {{ remesa.Addressee.name }}</p>
              <p><strong>Direccion:</strong> {{ remesa.Addressee.address }}</p>
            </div>
          </div>
          <div class="w-full lg:w-6/12 p-2">
            <h2 class="font-bold text-lg">Informacion de paf Remitente</h2>
            <div class="text-gray-800" v-if="remesa.Sender">
              <p><strong>Nombre:</strong> {{ remesa.Sender.name }}</p>
              <p><strong>Direccion:</strong> {{ remesa.Sender.address }}</p>
            </div>
            <div v-else>
              <p class="text-red-500">No hay informacion</p>
            </div>
          </div>
          <div class="w-full lg:w-6/12 p-2">
            <h2 class="font-bold text-lg">Datos de la remesa</h2>
            <div class="text-gray-800">
              <p><strong>Pedido:</strong> {{ remesa.order }}</p>
              <p>
                <strong>Tipo de servicio:</strong> {{ remesa.typeOfService }}
              </p>
              <p><strong>Subtipo de servicio:</strong> {{ remesa.subType }}</p>
              <p><strong>Contenido de remesa:</strong> {{ remesa.content }}</p>
            </div>
          </div>
          <div class="w-full lg:w-6/12 p-2">
            <h2 class="font-bold text-lg">Fechas</h2>
            <div class="text-gray-800">
              <p>
                <strong>Fecha de Pedido:</strong> {{ date(remesa.createdAt) }}
              </p>
              <p>
                <strong>Fecha de recojo de remesa:</strong>
                {{ remesa.senderDate ? date(remesa.senderDate) : "Pendiente" }}
              </p>
              <p>
                <strong>Fecha de entraga:</strong>
                {{ remesa.senderDate ? date(remesa.senderDate) : "Pendiente" }}
              </p>
            </div>
          </div>

          <div class="w-full p-2">
            <h2 class="font-bold text-lg">Bolsas</h2>
            <div class="mt-2">
              <table
                class="w-full text-sm text-left text-gray-500"
                v-if="remesa.bags.length > 0"
              >
                <thead class="text-xs text-gray-50 uppercase bg-gray-700">
                  <tr>
                    <th scope="col" class="px-6 py-3">Id</th>
                    <th scope="col" class="px-6 py-3">Bolsa seriales</th>
                    <th scope="col" class="px-6 py-3">monto</th>
                    <th scope="col" class="px-6 py-3">Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in remesa.bags"
                    :key="item.id"
                    class="border-b bg-gray-800 border-gray-700"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium whitespace-nowrap text-white"
                    >
                      {{ item.id }}
                    </th>
                    <th class="px-6 py-4">{{ item.serial }}</th>
                    <th class="px-6 py-4">{{ item.amount }}</th>
                    <th class="px-6 py-4">{{ item.type }}</th>
                  </tr>
                </tbody>
              </table>
              <div v-else>
                <p class="text-red-500">No hay informacion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b"
      >
        <button
          type="button"
          @click="modal = false"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
        >
          Cerrar
        </button>
      </div>
    </vue-final-modal>
  </div>
</template>
<script>
import Table from "@/components/Tables/Table.vue";
import {
  getRemesasManagerCompleteRequest,
  getRemesaRequest,
} from "../../api/remesa";
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
        { key: "addressee", label: "Paf que ordeno el servicio" },
        { key: "sender", label: "Paf remitente" },
        { key: "order", label: "Pedido" },
        { key: "typeOfService", label: "Tipo de servicio" },
        { key: "subType", label: "Sub Tipo" },
        { key: "createdAt", label: "Creado", date: true },
      ],
      options: [{ id: "view", name: "Ver informacion", icon: "fas fa-folder" }],
      remesa: {},
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
        const res = await getRemesasManagerCompleteRequest();
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
          item.addressee
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          item.sender.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.order.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.subType.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.typeOfService
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
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
        this.modal = true;
        const res = await getRemesaRequest(action.id);
        this.remesa = res.data;
      }
    },
  },
};
</script>
