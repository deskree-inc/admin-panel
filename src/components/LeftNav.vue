<template>
  <div class="left-navigation">
    <div class="dashboard-icon-wrapper">
      <img
          src="/img/icons/left-nav/dashboard.svg"
          alt="dashboard-icon"
          class="dashboard-icon"
      />
      <span class="nav-link" @click="logout">Logout</span>
    </div>
    <h1>Admin Panel</h1>
    <nav>
      <ul>
        <li v-for="path in paths" :key="path">
          <RouterLink :to="`/dashboard/` + path.replace(' ', '-').toLowerCase()">
            <div :class="path === 'Users' ? 'users' : 'circle' ">
              <img
                  :src="`/img/icons/left-nav/${path
                  .replace(/[^a-z0-9]/gi, '-')
                  .toLowerCase()}.svg`"
                  :alt="path.replace(/[^a-z0-9]/gi, '-').toLowerCase()"
              />
            </div>
            <span class="nav-link">{{ path }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
    <div class="logo-wrapper"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: "LeftNav",
  props: {
    paths: {
      type: Array,
      required: true,
    },
  },
  methods: {
    logout() {
      this.$store.commit('logout', {});
      this.$router.push("/login");
    },
  }
})

</script>

<style scoped lang="scss">
.left-navigation {
  background-color: $background-color-nav;
  opacity: 1;
  min-height: 100vh;
  width: 100%;
  padding: 26px 30px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;

  .avatar-container {
    display: flex;
    flex-direction: row;
    margin-bottom: 36px;
    gap: 8px;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .blue-circle {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: $primary-color;
      font-size: 12px;
      color: white;
      font-weight: bold;
      cursor: default;
    }
  }

  .dashboard-icon-wrapper {
    display: flex;
    cursor: pointer;
    gap: 1rem;
    .dashboard-icon {
      width: 15px;
      height: auto;
      margin-bottom: 30px;
      &:hover {
        filter: invert(100%);
      }
    }
  }

  h1 {
    text-align: left;
    font: normal normal 800 19px/24px Open Sans;
    letter-spacing: 0;
    color: $label-color-white-1;
    opacity: 1;
    text-transform: capitalize;
    margin-bottom: 30px;
  }

  .nav-link {
    text-align: left;
    font: normal normal 600 12px/14px Open Sans;
    letter-spacing: 0;
    color: $label-color-grey-1;
    opacity: 1;
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
    padding: 0;

    &:hover {
      color: $label-color-white-1;
    }
  }

  span.project-id {
    text-align: left;
    font: normal normal 600 10px/14px Open Sans;
    letter-spacing: 0;
    color: $label-color-grey-1;
    opacity: 1;
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 7px;
  }

  span.project-created-at {
    text-align: left;
    font: normal normal 600 10px/14px Open Sans;
    letter-spacing: 0;
    color: $label-color-grey-1;
    opacity: 1;
    margin-bottom: 32px;
  }

  nav {
    ul {
      margin: 0;
      padding: 0;

      li {
        list-style: none;

        a {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-direction: row;
          margin-bottom: 15px;
          text-decoration: none;

          &.router-link-active,
          &:hover {
            .circle {
              background: $label-color-white-1 0 0 no-repeat padding-box;

              img {
                filter: invert(100%);
              }
            }

            .users {
              background: $label-color-white-1 0 0 no-repeat padding-box;

              img {
                filter: invert(100%);
              }
            }

            .nav-link {
              color: $label-color-white-1;
            }
            .nav-link-line {
              color: $label-color-white-1;
            }
          }

          .circle {
            width: 25px;
            height: 25px;
            background: #373737 0 0 no-repeat padding-box;
            opacity: 1;
            margin-right: 13px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 100%;

            img {
              filter: initial;
            }
          }

          .users {
            width: 25px;
            height: 25px;
            opacity: 1;
            margin-right: 13px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 100%;

            img {
              filter: initial;
              width: 25px;
              height: 25px;
            }
          }

          .nav-link {
            text-align: left;
            font: normal normal bold 11px/15px Open Sans;
            letter-spacing: 0;
            color: #808080;
            opacity: 1;
            padding: 0;
          }
          .nav-link-line {
            text-align: left;
            font: normal normal bold 11px/15px Open Sans;
            border-bottom: #808080 1px solid;
            letter-spacing: 0;
            color: #808080;
            opacity: 1;
            padding: 0;
          }
        }
      }
    }
  }
  .logo-wrapper {
    display: flex;
    align-items: center;
    margin-top: 90px;
    img {
      width: 100px;
    }
    span {
      text-align: left;
      font: normal normal 600 10px/14px Open Sans;
      letter-spacing: 0;
      color: $label-color-grey-1;
      opacity: 1;
      margin-left: 30px;
    }
  }
}
</style>
