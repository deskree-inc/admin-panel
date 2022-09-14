<template>
  <div class="auth-wrapper">
    <loading-spinner :text="preloader.text" :show="preloader.show"></loading-spinner>
    <img src="@/assets/logo.svg" alt="deskree-logo" class="logo"/>
    <div class="container">
      <h1>Sign Up</h1>
      <div class="box">
        <div class="column">
          <div class="content">
            <TextInput
              v-model="form.email"
              label="Email Address"
              name="email"
              placeholder="Email"
              rules="required|email"
              :autoFocus="true"
              :showError="true"
              style="margin-bottom: 20px"
            />
            <TextInput
              v-model="form.fullName"
              label="Full Name"
              name="fullName"
              placeholder="Full Name"
              rules="required|email"
              :autoFocus="true"
              :showError="true"
              style="margin-bottom: 20px"
            />
            <TextInput
              v-model="form.password"
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
              rules="required"
              :autoFocus="true"
              :showError="true"
              style="margin-bottom: 20px"
            />
          </div>
          <span class="error" v-if="errors.length > 0">{{ errors[0].detail }}</span>
          <Button mod="primary" width="100%" @click="signUp"> Sign up</Button>
          <p class="register">
            Already have have an account?
            <RouterLink to="/login">Login here</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import TextInput from "@/components/TextInput.vue";
import Button from "@/components/Button.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {client} from "@/server";

export default defineComponent({
  name: 'SignUpView',
  components: {
    TextInput,
    Button,
    LoadingSpinner
  },
  data() {
    return {
      preloader: {
        text: "",
        show: false
      },
      form: {
        email: "",
        fullName: "",
        password: "",
      },
      errors: [],
    };
  },
  methods: {
    resetLoader() {
      this.preloader.show = false;
      this.preloader.text = "";
    },
    async signUp() {
      try {
        this.preloader.show = true;
        this.preloader.text = "Creating an account...";
        // Create account with email and password
        const userData = await client.post('/auth/accounts/signup', {
          email: this.form.email,
          password: this.form.password
        });

        // Update user object in the database
        const userObject = await client.patch(`/rest/collections/users/${userData.data.data.uid}`, {
          name: this.form.fullName,
          roles: [],
        }, {
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
        this.$router.push("/dashboard/customers");
      } catch (e: any) {
        this.resetLoader();
        console.error(e)
        this.errors = e.response.data.errors.errors;
      }
    }
  }
});
</script>


<style lang="scss" scoped>
.auth-wrapper {
  padding: 30px 50px;
  position: relative;
  min-height: 100vh;

  .logo {
    display: flex;
    width: 100px;
  }

  .copy {
    left: 50%;
    width: 300px;
    margin-left: -150px;
    position: absolute;
    bottom: 33px;
    text-align: center;
    font: normal normal normal 10px/16px Open Sans;
    color: $label-color-grey-1;

    p {
      display: inline-flex;
    }

    .breaker {
      width: 5px;
    }

    a {
      color: $label-color-grey-1;
      text-decoration: underline;
      transition: color ease-in 300ms;

      &:hover {
        color: $label-color-white-1;
      }
    }
  }

  .container {
    width: 100%;
    max-width: 420px;
    margin: 200px auto;

    h1 {
      font: normal normal normal 18px/24px Open Sans;
      color: $label-color-white-1;
      margin-bottom: 40px;
      text-align: center;
    }

    .box {
      background: #262626 0 0 no-repeat padding-box;
      box-shadow: 4px 43px 50px #00000029;
      border-radius: 14px;
      padding: 30px;
      display: flex;
      flex-direction: row;

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
      }
    }

    .register {
      color: $label-color-white-1;
      font: normal normal normal 11px/15px Open Sans;
      text-align: center;
      margin-top: 20px;

      a {
        color: $label-color-white-1;
        font-weight: 800;
        text-decoration: underline;
        transition: color ease-in 300ms;

        &:hover {
          color: white;
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

  .error {
    font: normal normal normal 10px/16px Open Sans;
    color: $danger-color;
    margin: 10px 0;
  }
}
</style>