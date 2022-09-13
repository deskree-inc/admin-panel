<template>
  <div class="analytics-page">
    <div class="analytics-page--body">
      <p class="page-title">Analytics</p>
      <AnalyticsOverview />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AnalyticsOverview from "@/components/Dashboard/AnalyticsOverview.vue";

export default defineComponent({
  name: 'AnalyticsView',
  components: {
    AnalyticsOverview,
  },
});
</script>

<style lang="scss" scoped>
header {
  height: 68px;
}

.analytics-page {
  &--body {
    width: 829px;
    margin-left: 78px;

    .page-title {
      font-size: 18px;
      line-height: 24px;
      color: #dddddd;
      margin-bottom: 30px;
      font-weight: 600;
    }
  }

  .data-source-view {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    position: fixed;
    bottom: 100px;
    right: 44px;

    p {
      margin-bottom: 1rem;
    }

    .gray {
      color: #6f6f6f;
    }
  }
}
</style>