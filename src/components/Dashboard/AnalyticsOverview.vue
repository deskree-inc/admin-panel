<template>
  <div class="overview-section rest-overview">
    <div class="overview-header">
      <p class="overview-title">Overview</p>
      <div class="date-container">
      </div>
    </div>

    <div class="overview-body">
      <div class="request-chart-container">
        <p class="chart-title">Total Requests</p>
        <p class="chart-statistics">0</p>
        <div class="request-chart-wrapper">
<!--          <LineChart-->
<!--              v-if="data.meta.total !== 0"-->
<!--              :data="data"-->
<!--              :filters="filters"-->
<!--              :interval="interval"-->
<!--              :startDate="startDate"-->
<!--              :endDate="endDate"-->
<!--              chart-id="rest-overview-chart"-->
<!--          />-->
        </div>
      </div>


    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {client} from "@/server";

export default defineComponent({
  name: 'AnalyticsOverview',
  data() {
    return {
      data: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        const {data} = await client.get('/rest/collections/customers');
        this.data = data;
      } catch (e) {
        console.error(e)
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.request-chart-wrapper {
  position: relative;
}
</style>
