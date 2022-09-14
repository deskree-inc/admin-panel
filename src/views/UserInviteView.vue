<template>
  <UserInvite :oob-code="code" :uid="uid" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserInvite from "@/components/Dashboard/Users/UserInvite.vue";

export default defineComponent({
  name: "UserInviteView",
  components: {
    UserInvite,
  },
  data() {
    return {
      code: this.$route.query.code,
      uid: this.$route.query.uid,
    };
  },
  beforeCreate() {
    const code = this.$route.query.code;
    const uid = this.$route.query.uid;
    if (code === undefined || uid === undefined) {
      this.$router.push("/login");
    }
  },
});
</script>
