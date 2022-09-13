<template>
  <div class="overview-section rest-overview">
    <div class="overview-header">
      <p class="overview-title">Overview</p>
      <div class="date-container">
<!--        <DateFilter @change="filterByDate" />-->
      </div>
    </div>

    <div class="overview-body">
      <div class="request-chart-container">
        <p class="chart-title">Total Requests</p>
        <p class="chart-statistics">0</p>
        <div class="request-chart-wrapper">
<!--          <EmptyMessage v-if="rest.total === 0" />-->
<!--          <LineChart-->
<!--              v-if="rest.total !== 0"-->
<!--              :data="chartData"-->
<!--              :filters="filters"-->
<!--              :interval="interval"-->
<!--              :startDate="startDate"-->
<!--              :endDate="endDate"-->
<!--              chart-id="rest-overview-chart"-->
<!--          />-->
          <EmptyLineChart
              :data="emptyChartData"
              chart-id="rest-overview-chart"
          />
        </div>
      </div>

      <div class="chart-filter">
        <p class="text-gray filter-date">2022</p>
        <div class="overview-filter-options">
          <div class="overview-filter-item">
            <div class="checkbox-wrapper">
              <CheckboxInline
                  v-model="filters.post"
                  text="POST"
                  checkboxValue="required"
                  name="post"
                  mod="info"
              />
              <span class="text-white">0</span>
            </div>
            <div class="filter-statistics">
              <p class="text-gray">requests</p>
              <p class="text-white">0.0%</p>
            </div>
          </div>

          <div class="overview-filter-item">
            <div class="checkbox-wrapper">
              <CheckboxInline
                  v-model="filters.get"
                  text="GET"
                  checkboxValue="required"
                  name="get"
                  mod="success"
              />
              <span class="text-white">0</span>
            </div>
            <div class="filter-statistics">
              <p class="text-gray">requests</p>
              <p class="text-white">0.0%</p>
            </div>
          </div>

          <div class="overview-filter-item">
            <div class="checkbox-wrapper">
              <CheckboxInline
                  v-model="filters.patch"
                  text="PATCH"
                  checkboxValue="required"
                  name="put"
                  mod="warn"
              />
              <span class="text-white">0</span>
            </div>
            <div class="filter-statistics">
              <p class="text-gray">requests</p>
              <p class="text-white">0.0%</p>
            </div>
          </div>

          <div class="overview-filter-item">
            <div class="checkbox-wrapper">
              <CheckboxInline
                  v-model="filters.delete"
                  text="DELETE"
                  checkboxValue="required"
                  name="delete"
                  mod="danger"
              />
              <span class="text-white">0</span>
            </div>
            <div class="filter-statistics">
              <p class="text-gray">requests</p>
              <p class="text-white">0.0%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import CheckboxInline from "@/components/CheckboxInline.vue";
import EmptyLineChart from "@/components/Dashboard/Charts/EmptyLineChart.vue";

export default defineComponent({
  name: 'AnalyticsOverview',
  components: {
    CheckboxInline,
    EmptyLineChart,
  },
  data() {
    return {
      filters: {
        post: true,
        get: true,
        patch: true,
        delete: true,
      },
    }
  },
  computed: {
    emptyChartData() {
      return [
        {
          name: "POST",
          data: [
            { label: "2022-01-01", value: null },
            { label: "2022-02-01", value: null },
            { label: "2022-03-01", value: null },
            { label: "2022-04-01", value: null },
            { label: "2022-05-01", value: null },
            { label: "2022-06-01", value: null },
            { label: "2022-07-01", value: null },
            { label: "2022-08-01", value: null },
            { label: "2022-09-01", value: null },
            { label: "2022-10-01", value: null },
            { label: "2022-11-01", value: null },
            { label: "2022-12-01", value: null },
          ],
        },
        {
          name: "GET",
          data: [
            { label: "2022-01-01", value: null },
            { label: "2022-02-01", value: null },
            { label: "2022-03-01", value: null },
            { label: "2022-04-01", value: null },
            { label: "2022-05-01", value: null },
            { label: "2022-06-01", value: null },
            { label: "2022-07-01", value: null },
            { label: "2022-08-01", value: null },
            { label: "2022-09-01", value: null },
            { label: "2022-10-01", value: null },
            { label: "2022-11-01", value: null },
            { label: "2022-12-01", value: null },
          ],
        },
        {
          name: "PATCH",
          data: [
            { label: "2022-01-01", value: null },
            { label: "2022-02-01", value: null },
            { label: "2022-03-01", value: null },
            { label: "2022-04-01", value: null },
            { label: "2022-05-01", value: null },
            { label: "2022-06-01", value: null },
            { label: "2022-07-01", value: null },
            { label: "2022-08-01", value: null },
            { label: "2022-09-01", value: null },
            { label: "2022-10-01", value: null },
            { label: "2022-11-01", value: null },
            { label: "2022-12-01", value: null },
          ],
        },
        {
          name: "DELETE",
          data: [
            { label: "2022-01-01", value: null },
            { label: "2022-02-01", value: null },
            { label: "2022-03-01", value: null },
            { label: "2022-04-01", value: null },
            { label: "2022-05-01", value: null },
            { label: "2022-06-01", value: null },
            { label: "2022-07-01", value: null },
            { label: "2022-08-01", value: null },
            { label: "2022-09-01", value: null },
            { label: "2022-10-01", value: null },
            { label: "2022-11-01", value: null },
            { label: "2022-12-01", value: null },
          ],
        },
      ];
    },
  },
});
</script>

<style lang="scss" scoped>
.request-chart-wrapper {
  position: relative;
}
</style>
