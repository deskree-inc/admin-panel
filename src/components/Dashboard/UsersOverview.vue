<template>
  <div class="users">
    <p class="page-title">Users</p>
    <div class="input-wrapper">
      <TextInput
        v-model="invite.email"
        name="email"
        placeholder="Email Address"
        rules="email"
        :showError="true"
        style="width: 100%"
      />
      <p v-if="error" class="error">{{ error }}</p>
      <button :class="!loading ? 'gen-btn' : 'gen-btn loading'" @click="inviteUser">
        {{ loading ? "" : "Invite" }}
      </button>
    </div>
    <div v-for="user in users" :key="user.uid" class="users-members-list">
      <div class="users-member">
        <div class="users-member-wrapper">
          <img src="/img/icons/left-nav/users.svg" class="avatar" alt="auth-avatar-icon" />
          <span>{{ user.email }}</span>
        </div>
        <div class="users-member-status">
          <img class="close-icon" src="@/assets/icons/close-blue.svg" alt="close-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TextInput from "@/components/TextInput.vue";
import { client } from "@/server";

export default defineComponent({
  name: "UsersOverview",
  components: {
    TextInput,
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      error: "",
      invite: {
        email: "",
      },
    };
  },
  methods: {
    async inviteUser() {
      try {
        this.loading = true;
        await client.post("auth/accounts/invite", { email: this.invite.email });
        await this.$emit("refresh");
      } catch (e) {
        console.error(e);
      }
      this.loading = false;
      this.invite.email = "";
    },
  },
});
</script>

<style scoped lang="scss">
.users {
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  padding: 0 180px;
  .page-title {
    font-size: 18px;
    line-height: 24px;
    color: #dddddd;
    margin-bottom: 30px;
    font-weight: 600;
  }
  .input-wrapper {
    display: flex;
    gap: 1.5rem;
    margin-top: 10px;
    margin-bottom: 15px;
    .error {
      font: normal normal normal 16px/22px Open Sans;
      color: $danger-color;
      margin-bottom: 10px;
    }
  }
  h6 {
    text-align: left;
    font: normal normal 600 13px/15px Open Sans;
    color: $label-color-white-1;
    margin-bottom: 15px;
  }
  p {
    text-align: left;
    font: normal normal normal 10px/16px Open Sans;
    color: $label-color-grey-1;
    margin-bottom: 15px;
  }
  .gen-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    height: 40px;
    width: 80px;
    font-size: 11px;
    font-weight: bold;
    color: #ffffff;
    background: #5884cb;
    outline: none;
    border: none;
    cursor: pointer;
    &.loading::after {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      border: 4px solid transparent;
      border-top-color: #ffffff;
      border-radius: 50%;
      animation: button-loading-spinner 1s ease infinite;
      @keyframes button-loading-spinner {
        from {
          transform: rotate(0turn);
        }

        to {
          transform: rotate(1turn);
        }
      }
    }
  }
  .users-members-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 16px;
    width: 100%;
    gap: 1rem;
    .users-member {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      justify-content: space-around;
      .users-member-wrapper {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-grow: 2;
        .member-info {
          display: flex;
          flex-direction: column;
          gap: 0;
          .member-name {
            font: normal normal 600 11px/35px Open Sans;
            color: #ffffff;
            filter: brightness(0.9);
            margin: 0;
            padding: 0;
            height: 25px;
          }
          .member-email {
            font: normal normal normal 10px/16px Open Sans;
            color: $label-color-grey-1;
            margin: 0;
            padding: 0;
          }
        }
        img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }
        span {
          font: normal normal 600 11px/35px Open Sans;
          color: #ffffff;
          filter: brightness(0.9);
        }
      }
      .users-member-status {
        display: flex;
        align-items: center;
        gap: 1rem;
        &--pending {
          p {
            font: italic normal normal 10px/30px Open Sans;
            color: $warning-color;
            margin: 0;
            padding: 0;
          }
        }
        &--rejected {
          p {
            font: italic normal normal 10px/30px Open Sans;
            color: $danger-color;
            margin: 0;
            padding: 0;
          }
        }
        .placeholder {
          width: 19px;
          height: 19px;
        }
        .close-icon {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
