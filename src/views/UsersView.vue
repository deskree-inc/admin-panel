<template>
  <loading-spinner :text="preloader.text" :show="preloader.show"></loading-spinner>
  <UsersOverview :users="listOfUsers" @refresh="getUsers" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UsersOverview from "@/components/Dashboard/UsersOverview.vue";
import { client } from "@/server";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default defineComponent({
  name: "UserView",
  data() {
    return {
      listOfUsers: [],
      preloader: {
        text: "",
        show: false,
      },
    };
  },
  components: {
    UsersOverview,
    LoadingSpinner,
  },
  async mounted() {
    await this.getUsers();
  },
  methods: {
    resetLoader() {
      this.preloader.show = false;
      this.preloader.text = "";
    },
    async getUsers() {
      try {
        this.preloader.show = true;
        this.preloader.text = "Getting users...";
        const { data } = await client.get('/rest/collections/users');
        this.listOfUsers = data.data.map((obj) => {
          return {
            email: obj.attributes.email,
            name: obj.attributes.name,
            uid: obj.uid,
          };
        });
      } catch (e) {
        console.error(e)
      }
      this.resetLoader();
    }
  },
});
</script>
