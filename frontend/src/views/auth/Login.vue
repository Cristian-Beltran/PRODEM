<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <h6 class="text-blueGray-500 text-xl font-bold">Login</h6>
            </div>
            <hr class="mt-6 border-b-1 border-blueGray-300" />
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div v-if="alertOpen">
              <div
                v-for="(item, index) in errors"
                :key="index"
                className="bg-red-500 p-2 text-white rounded-lg mb-2 text-center"
              >
                {{ item }}
              </div>
            </div>
            <form :onSubmit="handleSubmit">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email o Usuario
                </label>
                <div
                  class="p-1 mb-1"
                  v-for="(error, index) of v$.formData.emailOrUser.$errors"
                  :key="index"
                >
                  <p class="text-sm text-red-500">{{ error.$message }}</p>
                </div>
                <input
                  v-model="v$.formData.emailOrUser.$model"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <div
                  class="p-1 mb-1"
                  v-for="(error, index) of v$.formData.password.$errors"
                  :key="index"
                >
                  <p class="text-sm text-red-500">{{ error.$message }}</p>
                </div>
                <input
                  v-model="v$.formData.password.$model"
                  type="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                />
              </div>

              <div class="text-center mt-6">
                <button
                  class="bg-blue-900 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                >
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="$store.state.user">
      {{ $store.state.user }}
    </div>
  </div>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { loginRequest } from "../../api/auth";

export default {
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      formData: {
        emailOrUser: "",
        password: "",
      },
      errors: [],
      alertOpen: false,
    };
  },
  validations() {
    return {
      formData: {
        emailOrUser: {
          required: helpers.withMessage(
            "El usuario o correo es requerido",
            required
          ),
        },
        password: {
          required: helpers.withMessage("El password es requerido", required),
          minLength: helpers.withMessage(
            ({ $params }) =>
              `La contraseña ser de minimo ${$params.min} caracteres`,
            minLength(8)
          ),
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
            const res = await loginRequest(this.formData);
            this.$store.commit("SET_USER", res.data);
            this.$store.commit("SET_ISAUTHENTICATED", true);
            const token = res.data.token; // Guarda el token en una cookie
            this.$cookies.set("token", token, "1d");
            location.reload();
          } catch (error) {
            this.errors = error.response.data.errors;
            this.notification();
          }
        };
        request();
      }
    },
  },
};
</script>
