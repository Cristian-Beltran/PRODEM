<template>
  <div>
    <navbar />
    <main>
      <section class="relative w-full h-full py-40 min-h-screen">
        <div
          class="absolute top-0 w-full h-full bg-blue-900 bg-no-repeat bg-full"
        ></div>
        <router-view />
      </section>
    </main>
  </div>
</template>
<script>
import Navbar from "@/components/Navbars/AuthNavbar.vue";

export default {
  data() {
    return {};
  },
  components: {
    Navbar,
  },
};
</script>
