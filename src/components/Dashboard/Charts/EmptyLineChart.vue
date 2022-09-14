<template>
  <div class="line-chart-container">
    <div class="chat-wrapper" :id="chartId"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import * as Highcharts from "highcharts";
import moment from "moment/moment";
import windowSize from "@/mixins/windowSize";

interface IPoint {
  label: string;
  value: any;
}

interface IChartDataItem {
  name: string;
  data: IPoint[];
}

export default defineComponent({
  name: "EmptyLineChart",
  props: {
    data: {
      type: Array,
      required: true,
    },
    chartId: {
      type: String,
      required: true,
    },
  },
  mixins: [windowSize],
  methods: {
    drawChart(): void {
      if (this.data[0]) {
        const categories = (this.data[0] as IChartDataItem).data.map((item) => {
          return item.label;
        });

        const series = (this.data as IChartDataItem[]).map((item) => {
          return {
            type: "spline",
            name: item.name,
            data: item.data.map((data) => data.value),
          } as const;
        });

        Highcharts.chart(this.chartId, {
          colors: ["#5884CB", "#45A07D", "#B49646", "#C3625E", "#A2A2A2"],
          chart: {
            type: "spline",
            backgroundColor: "transparent",
            style: {
              fontFamily: '"Open Sans", Arial, Helvetica, sans-serif',
            },
          },
          title: undefined,
          xAxis: {
            lineWidth: 0,
            categories: categories,
            labels: {
              formatter: function () {
                return moment(this.value).format("MMM");
              },
              style: {
                color: "#969696",
                fontSize: this.$data.isLargeSize ? "12px" : "9px",
                fontWeight: "600",
              },
            },
            crosshair: {
              className: "custom-tooltip-crosshair",
              width: this.$data.isLargeSize ? 34 : 41,
            },
          },
          yAxis: {
            min: 0,
            max: 30,
            title: undefined,
            gridLineDashStyle: "Dash",
            gridLineColor: "#333333",
            labels: {
              style: {
                color: "#969696",
                fontSize: this.$data.isLargeSize ? "12px" : "10px",
                fontWeight: "600",
              },
            },
          },
          tooltip: {
            formatter: function () {
              let html = `<div class="custom-tooltip-content">
              <p class="content-header">${moment(this.x).format(
                  "MMMM YYYY"
              )}</p>`;

              if (this.points) {
                const total = this.points.reduce((sum, point: any) => {
                  return sum + point.y;
                }, 0);

                html += `<p class="content-sub-header">${total.toLocaleString()}</p>`;

                for (const point of this.points) {
                  const percentage = (point.y! / total) * 100;

                  html += `
                  <div class="point-info">
                    <span class="color-box" style="background-color: ${
                      point.color
                  }"></span>
                    <span class="point-title" style="color: ${point.color}">${
                      point.series.name
                  }</span>
                    <span class="point-value">${point.y}</span>
                    <span class="point-percent">${percentage.toFixed(1)}%</span>
                  </div>
                `;
                }
              }
              html += `</div>`;
              return html;
            },
            padding: 15,
            shared: true,
            borderRadius: 14,
            useHTML: true,
            backgroundColor: "#2F2F2F",
            borderWidth: 0,
          },
          plotOptions: {
            spline: {
              lineWidth: 3,
              marker: {
                radius: 0,
                symbol: "circle",
                states: {
                  hover: {
                    radius: 4,
                    lineWidth: 0,
                  },
                },
              },
            },
          },
          legend: {
            enabled: false,
          },
          credits: {
            enabled: false,
          },
          series: series,
        });
      }
    },
  },
  mounted() {
    this.drawChart();
  },
});
</script>

<style lang="scss">
.line-chart-container {
  margin-top: 30px;

  .chat-wrapper {
    height: 190px;
  }

  .custom-tooltip-crosshair {
    stroke: rgba(221, 221, 221, 0.07);
  }

  .custom-tooltip-content {
    .content-header {
      color: #969696;
      font-size: 8px;
      margin-bottom: 10px;
      font-weight: 600;
    }

    .content-sub-header {
      color: #dddddd;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 21px;
    }

    .point-info {
      width: 100%;
      display: flex;
      align-items: center;
      color: #dddddd;
      font-size: 11px;
      font-weight: 600;
      margin-bottom: 5px;

      .color-box {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        margin-right: 5px;
      }

      .point-title {
        flex: 1;
        min-width: 57px;
      }

      .point-value {
        text-align: right;
        margin-left: 7px;
      }

      .point-percent {
        min-width: 46px;
        text-align: right;
      }
    }
  }
}
</style>
