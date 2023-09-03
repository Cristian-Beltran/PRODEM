<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
      >
        <div class="rounded-t bg-white mb-0 px-6 py-6">
          <div class="text-center flex justify-between">
            <h6 class="text-blueGray-700 text-xl font-bold">Vehiculo</h6>
          </div>
        </div>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <h5 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Infomacion de Vehiculo
          </h5>

          <div class="flex flex-wrap">
            <div class="w-full lg:w-4/12 px-4">
              <div class="relative w-full mb-3">
                <img class="rounded-lg" :src="vehicle.photo" />
              </div>
            </div>
            <div class="w-full lg:w-8/12 px-4">
              <div class="relative w-full mb-3">
                <h5
                  class="mb-2 text-2xl font-bold tracking-tight text-gray-900"
                >
                  Vehiculo blindado {{ vehicle.model }}
                </h5>
                <p class="mb-3 font-normal text-gray-700">
                  <strong>Placa:</strong> {{ vehicle.plate }}
                  <br />
                  <strong>Conductor asignado:</strong>
                  {{ vehicle.driverFullName }}
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getVehicleRequest } from "../../api/vehicle";
import { getMaintenancesByVehicleRequest } from "../../api/maintenance";
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
      vehicle: {},
    };
  },
  created() {
    this.getDataVehicle();
  },
  methods: {
    async getDataVehicle() {
      try {
        const res = await getVehicleRequest(this.$route.params.id);
        this.vehicle = res.data;
        this.vehicle.photo = axios.defaults.baseURL + this.vehicle.photo;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
