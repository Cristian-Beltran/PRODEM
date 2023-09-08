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
                Verificaciones de Vehiculos Blindados
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
            <router-link to="/admin/addVerify" v-slot="{ href, navigate }">
              <a :href="href" @click="navigate">
                <button
                  class="bg-grayBlue-800 text-sm border border-gray-300 px-2 py-2 rounded-md"
                >
                  Agregar verificación
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
      </div>
    </div>
    <vue-final-modal
      v-model="showModal"
      class="flex justify-center items-center"
      content-class="w-2/3 max-h-3/4 p-4 bg-white rounded-lg shadow "
    >
      <!-- Modal header -->
      <div class="flex items-start justify-between p-4 border-b rounded-t">
        <h3 class="text-xl font-semibold text-gray-900">Verificacion</h3>
        <button
          type="button"
          @click="showModal = false"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
        >
          <i class="fas fa-close"></i>
          <span class="sr-only">Close modal</span>
        </button>
      </div>
      <!-- Modal body -->
      <div class="p-6">
        <div class="flex flex-wrap max-h-80 overflow-auto">
          <div class="w-full lg:w-6/12 p-2">
            <h2 class="font-bold text-lg">Informacion de personal</h2>
            <div class="text-gray-800">
              <p><strong>Vehiculo:</strong> {{ verifyData.vehicleName }}</p>
              <p><strong>Conductor:</strong> {{ verifyData.driverName }}</p>
              <p><strong>Guardia:</strong> {{ verifyData.guardName }}</p>
            </div>
          </div>
          <div class="w-full lg:w-6/12 p-2">
            <h2 class="font-bold text-lg">Informacion adicional</h2>
            <div class="text-gray-800">
              <p>
                <strong>Fecha de verificación:</strong>
                {{ verifyData.createdAt }}
              </p>
              <p><strong>kilometraje:</strong> {{ verifyData.km }} [km]</p>
              <p><strong>Tanque de combustible:</strong> {{ verifyData.fuel }} </p>
              <p>
                <strong>Observacione:</strong> {{ verifyData.observations }}
              </p>
            </div>
          </div>
          <div class="w-full lg:w-6/12 p-2">
            <h2 class="font-bold text-lg">Sistema de luces</h2>
            <div class="text-gray-800">
              <p>
                <strong>Estacionamiento:</strong> {{ verifyData.lightParking }}
              </p>
              <p><strong>Bajas:</strong> {{ verifyData.lightLow }}</p>
              <p><strong>Altas:</strong> {{ verifyData.lightHigh }}</p>
              <p>
                <strong>Marcha atras:</strong> {{ verifyData.lightReverse }}
              </p>
              <p>
                <strong>Viraje izquierda/derecha:</strong>
                {{ verifyData.lightTravel }}
              </p>
            </div>
          </div>
          <div class="w-full lg:w-6/12 p-2">
            <h2 class="font-bold text-lg">Equipos</h2>
            <div class="text-gray-800">
              <p>
                <strong>Destellador:</strong> {{ verifyData.equipmentFlasher }}
              </p>
              <p><strong>Sirena:</strong> {{ verifyData.equipmentHooter }}</p>
              <p>
                <strong>Sistema caja buzon:</strong>
                {{ verifyData.equipmentMailbox }}
              </p>
              <p><strong>Vidrios:</strong> {{ verifyData.equipmentGlass }}</p>
              <p>
                <strong>Troneros y seguros:</strong>
                {{ verifyData.equipmentPI }}
              </p>
            </div>
          </div>
          <div class="w-full lg:w-6/12 p-2">
            <h2 class="font-bold text-lg">Sistema de frenos</h2>
            <div class="text-gray-800">
              <p><strong>De mano:</strong> {{ verifyData.brakeHand }}</p>
              <p><strong>De pedal:</strong> {{ verifyData.brakeFoot }}</p>
              <p>
                <strong>Otros:</strong>
                {{ verifyData.brakeOther }}
              </p>
            </div>
          </div>
          <div class="w-full lg:w-6/12 p-2">
            <h2 class="font-bold text-lg">Comunicaciones</h2>
            <div class="text-gray-800">
              <p>
                <strong>Monitoreo GPS:</strong>
                {{ verifyData.communicationGPS }}
              </p>
              <p>
                <strong>Celular GSM:</strong> {{ verifyData.communicationGSM }}
              </p>
              <p>
                <strong>Equipo de comunicación de contingencia:</strong>
                {{ verifyData.communicationContingency }}
              </p>
            </div>
          </div>
          <div class="w-full lg:w-6/12 p-2">
            <h2 class="font-bold text-lg">Neumaticos</h2>
            <div class="text-gray-800">
              <p>
                <strong>Rueda frontal derecha:</strong>
                {{ verifyData.tireFR }}
              </p>
              <p>
                <strong>Rueda frontal izquierda:</strong>
                {{ verifyData.tireFL }}
              </p>
              <p>
                <strong>Rueda trasera derecha:</strong>
                {{ verifyData.tireBR }}
              </p>
              <p>
                <strong>Rueda trasera izquierda:</strong>
                {{ verifyData.tireBL }}
              </p>
              <p>
                <strong>Repuesto:</strong>
                {{ verifyData.tireReplace }}
              </p>
            </div>
          </div>
          <div class="w-full lg:w-6/12 p-2">
            <h2 class="font-bold text-lg">Equipo de contingencia</h2>
            <div class="text-gray-800">
              <p>
                <strong>Mascara antigas:</strong>
                {{ verifyData.contingenciesMask }}
              </p>
              <p>
                <strong>Tubo de oxigeno:</strong>
                {{ verifyData.contingenciesOxigen }}
              </p>
              <p>
                <strong>Triangulos:</strong>
                {{ verifyData.contingenciesTriangles }}
              </p>
              <p>
                <strong>Botiquin de primeros auxilios:</strong>
                {{ verifyData.contingenciesKit }}
              </p>
              <p>
                <strong>Extintor 1:</strong>
                {{ verifyData.contingenciesExtinguisher1 }}
              </p>
              <p>
                <strong>Extintor 2:</strong>
                {{ verifyData.contingenciesExtinguisher2 }}
              </p>
            </div>
          </div>
          <div class="w-full lg:w-6/12 p-2">
            <h2 class="font-bold text-lg">Accesorios/Documentos</h2>
            <div class="text-gray-800">
              <p>
                <strong>Gata hidraulica:</strong>
                {{ verifyData.daHydraulicjack }}
              </p>
              <p>
                <strong>Llave de ruedas:</strong>
                {{ verifyData.daWheelwrench }}
              </p>
              <p>
                <strong>Cinturon de seguridad:</strong>
                {{ verifyData.daSeatbelt }}
              </p>
              <p>
                <strong>Espejos laterales:</strong>
                {{ verifyData.daMirrors }}
              </p>
              <p>
                <strong>Bocina de retroceso:</strong>
                {{ verifyData.daBhorn }}
              </p>
              <p>
                <strong>Cerraduras y chapas:</strong>
                {{ verifyData.daLocks }}
              </p>
            </div>
          </div>
          <div class="w-full lg:w-6/12 p-2">
            <h2 class="font-bold text-lg">Equipamineto chalecos antibalas</h2>
            <div class="text-gray-800">
              <p>
                <strong>Conductor:</strong>
                {{ verifyData.bulletproofdriver}}
              </p>
              <p>
                <strong>Porta valor 1:</strong>
                {{ verifyData.bulletproofP1}}
              </p>
              <p>
                <strong>Porta valor 2:</strong>
                {{ verifyData.bulletproofP2}}
              </p>
              <p>
                <strong>Guardia 1:</strong>
                {{ verifyData.bulletproofG1}}
              </p>
              <p>
                <strong>Guardia 2:</strong>
                {{ verifyData.bulletproofG2}}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b"
      >
        <button
          type="button"
          @click="showModal = false"
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
import { VueFinalModal } from "vue-final-modal";
import { getVerifyRequest, getVerifysRequest } from "../../api/verify";

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
      showModal: false,
      verifyData: {},
      columnas: [
        { key: "id", label: "ID" },
        { key: "vehicle", label: "Vehiculo" },
        { key: "driver", label: "Conductor" },
        { key: "guard", label: "Guardia" },
        { key: "createdAt", label: "Creado", date: true },
      ],
      options: [
        { id: "update", name: "Actualizar", icon: "fas fa-plus" },
        { id: "view", name: "Ver", icon: "fas fa-eye" },
      ],
    };
  },
  components: {
    Table,
    VueFinalModal,
  },
  created() {
    this.loadData();
  },
  watch: {
    status() {
      this.searchItems();
    },
  },
  methods: {
    async loadData() {
      this.load = true;
      try {
        const res = await getVerifysRequest();
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
          (item.first_name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
            item.last_name
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            item.username
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            item.email
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())) &&
          (this.status === "all" || item.status == this.status)
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
      if (action.action === "update") {
        this.$router.push({
          path: "/admin/updateVerify",
          query: { id: action.id },
        });
      } else if (action.action === "view") {
        const res = await getVerifyRequest(action.id);
        this.verifyData = res.data;
        this.verifyData.createdAt = this.date(this.verifyData.createdAt);
        this.showModal = true;
      }
    },
  },
};
</script>
