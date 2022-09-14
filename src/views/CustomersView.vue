<template>
  <div class="customers-page">
    <loading-spinner :text="preloader.text" :show="preloader.show"></loading-spinner>
    <p class="page-title">Customers</p>
    <CustomersOverview :header="header" :tables="tables" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomersOverview from "@/components/Dashboard/CustomersOverview.vue";
import { client } from "@/server";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default defineComponent({
  name: "CustomersView",
  components: {
    CustomersOverview,
    LoadingSpinner,
  },
  data() {
    return {
      header: ["uid", "Name", "Company", "Created At"] as any[],
      tables: [] as any[],
      preloader: {
        text: "",
        show: false,
      },
    };
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    resetLoader() {
      this.preloader.show = false;
      this.preloader.text = "";
    },
    async getData() {
      try {
        this.preloader.show = true;
        this.preloader.text = "Getting customers...";
        const { data } = await client.get("/rest/collections/customers");
        this.tables = data.data.map((obj) => {
          return {
            uid: obj.uid,
            name: obj.attributes.name,
            company: obj.attributes.company,
            createdAt: obj.attributes.createdAt,
          };
        });
      } catch (e) {
        console.error(e);
      }
      this.resetLoader();
    },
  },
});
</script>

<style scoped lang="scss">
.customers-page {
  width: 829px;
  margin-left: 78px;

  .page-title {
    font-size: 18px;
    line-height: 24px;
    color: #dddddd;
    margin-bottom: 30px;
    font-weight: 600;
    margin-left: calc(100% - 740px);
  }
}
</style>
