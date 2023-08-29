<template>
  <div id="app">
    <router-view />
    <ModalsContainer />
  </div>
</template>
<script>
import { ModalsContainer } from "vue-final-modal";
export default {
  components: {
    ModalsContainer,
  },
};
</script>
