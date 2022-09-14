<template>
  <div class="auth-wrapper">
    <loading-spinner :text="preloader.text" :show="preloader.show"></loading-spinner>
    <img src="@/assets/logo.svg" alt="deskree-logo" class="logo" />
    <div class="container">
      <h1>Join project</h1>
      <div class="box">
        <div class="column">
          <form @submit.prevent="onSubmit">
            <div class="content">
              <p class="description">
                You've been invited to a project. Please create a password for your account to join.
              </p>
              <TextInput
                v-model="form.fullName"
                label="Full Name"
                name="fullName"
                :auto-focus="true"
                style="margin-bottom: 20px"
              />
              <TextInput
                v-model="form.password"
                label="Password"
                type="password"
                name="newPassword"
                :showError="true"
                style="margin-bottom: 40px"
              />
              <p v-if="errors.length !== 0" class="error">{{ error[0].detail }}</p>
            </div>
            <Button mod="primary" type="submit" width="100%">Join</Button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TextInput from "@/components/TextInput.vue";
import Button from "@/components/Button.vue";
import { client } from "@/server";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default defineComponent({
  name: "UserInvite",
  components: {
    TextInput,
    Button,
    LoadingSpinner,
  },
  props: {
    oobCode: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      form: {
        email: "",
        fullName: "",
        password: "",
      },
      preloader: {
        text: "",
        show: false
      },
      error: "",
      errors: []
    };
  },
  async mounted() {
    await this.getUserEmail();
  },
  methods: {
    async getUserEmail() {
      try {
        const { data } = await client.get(`/rest/collections/users/${this.uid}`);
        this.form.email = data.data.email
      } catch (e) {
        console.log(e);
      }
    },
    async onSubmit(): Promise<any> {
      try {
        this.preloader.show = true;
        this.preloader.text = "Accepting invitation...";
        await client.post("/auth/accounts/verify/invite", {
          oobCode: this.oobCode,
          newPassword: this.form.password,
          uid: this.uid,
        });
        await this.login();
      } catch (e) {
        console.error(e);
      }
      this.resetLoader();
    },
    resetLoader() {
      this.preloader.show = false;
      this.preloader.text = "";
    },
    resetForm() {
      this.form.email = "";
      this.form.fullName = "";
      this.form.password = "";
    },
    async login() {
      try {
        this.preloader.show = true;
        this.preloader.text = "Logging in...";
        const userData = await client.post('/auth/accounts/sign-in/email', {
          email: this.form.email,
          password: this.form.password
        });
        const userObject = await client.get(`/rest/collections/users/${userData.data.data.uid}`, {
          headers: {
            Authorization: `Bearer ${userData.data.data.idToken}`
          }
        });

        this.$store.commit('saveUser', {
          uid: userData.data.data.uid,
          name: userObject.data.data.name,
          email: userData.data.data.email,
          roles: userObject.data.data.roles,
          token: userData.data.data.idToken,
          refreshToken: userData.data.data.refreshToken,
        });
        this.resetLoader();
        this.resetForm();
        this.$router.push("/dashboard/customers");
      } catch (e: any) {
        this.resetLoader();
        console.error(e)
        this.errors = e.response.data.errors.errors;
      }
    }
  },
});
</script>

<style lang="scss" scoped>
.auth-wrapper {
  padding: 30px 50px;
  position: relative;
  min-height: 100vh;

  .logo {
    width: 100px;
  }

  .container {
    width: 100%;
    max-width: 390px;
    margin: 50px auto;

    h1 {
      font: normal normal normal 18px/24px Open Sans;
      color: $label-color-white-1;
      margin-bottom: 20px;
      text-align: center;
    }

    .box {
      background: #262626 0 0 no-repeat padding-box;
      box-shadow: 4px 43px 50px #00000029;
      border-radius: 14px;
      padding: 30px;
      display: flex;
      flex-direction: row;
      min-height: 190px;

      .column {
        width: 100%;

        &:nth-of-type(1) {
          padding-right: 30px;
        }

        &:nth-of-type(2) {
          border-left: 2px solid #373737;
          padding-left: 30px;
          padding-top: 30px;
        }

        .content {
          .description {
            margin-bottom: 20px;
          }
          .changed-password {
            font: normal normal normal 16px/22px Open Sans;
            color: #dddddd;
          }

          .error {
            font: normal normal normal 10px/16px Open Sans;
            color: $danger-color;
            margin-bottom: 10px;
          }

          h4 {
            font: normal normal normal 11px/16px Open Sans;
            color: #dddddd;
            margin-bottom: 20px;
          }

          p {
            font: normal normal normal 10px/16px Open Sans;
            color: $label-color-grey-1;
          }
        }
      }
    }

    .auth-button {
      background-color: white;
      border-radius: 8px;
      padding: 12px 16px;
      border: none;
      outline: none;
      width: 100%;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: left;
      font: normal normal bold 11px/15px Open Sans;
      letter-spacing: 0;
      color: #2f2f2f;
      cursor: pointer;
      transition: background-color ease-in 300ms;

      img {
        width: 23px;
      }

      span {
        text-align: center;
        width: calc(100% - 23px);
      }

      &:hover {
        background-color: #dddddd;
      }
    }

    .notice {
      text-align: center;
      font: normal normal normal 10px/16px Open Sans;
      color: $label-color-grey-1;

      a {
        color: $label-color-grey-1;
        text-decoration: underline;
        transition: color ease-in 300ms;

        &:hover {
          color: $label-color-white-1;
        }
      }
    }
  }
}

// Mobile
@media screen and (max-width: 400px) {
  .auth-wrapper {
    .container {
      width: 100%;

      .box {
        flex-direction: column;

        .column {
          width: 100%;
          padding-right: 0 !important;
          padding-left: 0 !important;
          border-left: none !important;
        }
      }
    }
  }
}
</style>
