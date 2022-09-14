<template>
  <div>
    <CustomersOverview :header="header" :tables="tables"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomersOverview from "@/components/Dashboard/CustomersOverview.vue";
import { client } from "@/server";

export default defineComponent({
  name: "CustomersView",
  components: {
    CustomersOverview,
  },
  data() {
    return {
      header: ["uid", "Name", "Company", "Created At"] as any[],
      tables: [] as any[],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const {data} = await client.get('/rest/collections/customers');
        this.tables = data.data.map((obj) => {
          return {
            uid: obj.uid,
            name: obj.attributes.name,
            company: obj.attributes.company,
            createdAt: obj.attributes.createdAt,
          };
        });
        console.log(data.data);
      } catch (e) {
        console.error(e)
      }
    }

    // async getTables() {
    //   try {
    //     const URL = `${this.project.baseUrl}/config/collections`;
    //     const res: RestResponseManyInterface = await axios.get(URL);
    //     this.tables = res.data.data.map((obj) => {
    //       obj.attributes["uid"] = obj.uid;
    //       return obj.attributes;
    //     });
    //   } catch (e) {
    //     console.error(e);
    //   }
    // },
  },
});
</script>
