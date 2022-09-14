<template>
  <div class="project">
    <div class="menu">
      <LeftNav
          :paths="paths"
      />
    </div>
    <div class="page-content">
      <header></header>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import LeftNav from "@/components/LeftNav.vue";

export default defineComponent({
  name: 'DashboardView',
  components: {LeftNav},
  data() {
    return {
      paths: [
        "Customers",
        "Users",
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: right;
  align-items: flex-start;
  padding: 21px 24px;
}
.menu {
  width: 205px;
  position: fixed;
  z-index: 999;
}
.page-content {
  margin-left: 190px;
  height: 100vh;
  overflow: auto;
  scroll-behavior: smooth;
}
</style>