<template>
  <div class="table">
    <main class="table-wrapper">
      <table>
        <thead>
          <tr class="header-row">
            <th v-for="(val, index) in header" :key="index">
              <HeaderCell :name="val"></HeaderCell>
            </th>
          </tr>
        </thead>
        <tbody v-if="tables.length > 0">
          <tr v-for="item in tables" :key="item.uid" class="table-row">
            <td v-for="val in Object.entries(item)" :key="`${val[0]}${val[1]}`">
              <div class="cell">
                <span>{{ val[1] }}</span>
              </div>
              <img src="@/assets/icons/2pixels.svg" alt="2pixels" class="two-pixels-left" />
              <img src="@/assets/icons/2pixels.svg" alt="2pixels" class="two-pixels-right" />
            </td>
            <Button mod="primary" width="100%" style="margin-top: 8px" @click="handleModal(item.company, item.name)"
              >Create ticket</Button
            >
          </tr>
        </tbody>
        <tbody v-else>
          <tr class="table-row">
            <td v-for="index in header" :key="index">
              <div class="cell empty">
                <span></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
  <GenericModal
    :show="openModal"
    button-text="Save"
    header-text="Create ticket"
    :loading="loading"
    @confirm="createTicket"
    @discard="discardModal"
  >
    <TextInput :value="ticket.title" title="Title" :disabled="true" label="Title" style="margin-bottom: 10px" />
    <TextInput
      v-model="ticket.description"
      label="Description"
      rules="required"
      :showError="true"
      type="text"
      style="margin-bottom: 10px"
    />
  </GenericModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderCell from "@/components/HeaderCell.vue";
import Button from "@/components/Button.vue";
import GenericModal from "@/components/Modal.vue";
import TextInput from "@/components/TextInput.vue";
import { client } from "@/server";

export default defineComponent({
  name: "CustomersOverview",
  components: {
    Button,
    HeaderCell,
    GenericModal,
    TextInput,
  },
  props: {
    header: {
      type: Array,
      required: true,
    },
    tables: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      openModal: false,
      loading: false,
      ticket: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
    handleModal(companyName: string, customerName: string) {
      this.openModal = true;
      this.ticket.title = `${companyName} | ${customerName}`;
    },
    discardModal() {
      this.openModal = false;
      this.ticket.title = "";
      this.loading = false;
    },
    async createTicket() {
      try {
        this.loading = true;
        await client.post(`/integrations/github/repos/${process.env.VUE_APP_GITHUB_OWNER}/${process.env.VUE_APP_GITHUB_REPO}/issues`, {
          title: this.ticket.title,
          body: this.ticket.description,
        });
      } catch (e) {
        console.error(e);
      }
      this.discardModal();
    },
  },
});
</script>

<style lang="scss" scoped>
.table {
  &.filter-on {
    padding-bottom: 80px;
  }

  .table-wrapper {
    width: 100%;
    margin: 0 0 20px;
    overflow-scrolling: unset;
    padding-left: 80px;
    min-height: 50vh;

    thead {
      border: none;

      .header-row {
        th {
          padding: 0 7px 7px 0;
        }
      }
    }

    tbody {
      border: none;

      tr:first-of-type .cell {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;

        &.active {
          border-top: 2px solid $primary-color;
        }
      }

      tr:last-of-type {
        .two-pixels-left,
        .two-pixels-right {
          display: none;
        }

        .cell {
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;

          &.active {
            border-bottom: 2px solid $primary-color;
          }
        }
      }

      tr {
        td {
          padding: 0 7px 2px 0;

          .two-pixels-left {
            position: absolute;
            left: 0;
            bottom: 0;
          }

          .two-pixels-right {
            position: absolute;
            right: 7px;
            bottom: 0;
          }

          .cell {
            background: #2f2f2f 0 0 no-repeat padding-box;
            opacity: 1;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            max-width: 250px;

            &.active {
              border: 2px solid $primary-color;
              border-top: none;
              border-bottom: none;
            }

            span {
              text-align: left;
              font: normal normal normal 11px/20px Open Sans;
              color: $label-color-white-1;
              opacity: 1;
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin: 0 15px;
            }

            &.empty {
              border-radius: 10px;
            }
          }
        }
      }
    }
  }

  .table-pagination {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0 80px;

    .three-dots {
      text-align: center;
      font: normal normal bold 11px/15px Open Sans;
      letter-spacing: 1.1px;
      color: $primary-color;
    }

    .page-button {
      text-align: center;
      font: normal normal bold 11px/15px Open Sans;
      color: $primary-color;
      border: none;
      margin-right: 4px;
      background: none;
      display: flex;
      padding: 0;

      &.hide {
        display: none;
      }

      &.active,
      &:hover {
        background: #373737 0 0 no-repeat padding-box;
        border-radius: 5px;

        span {
          color: $label-color-white-1;
        }

        img {
          filter: brightness(0) invert(1);
        }
      }
    }

    .goto {
      background: #373737 0 0 no-repeat padding-box;
      border-radius: 5px;
      padding: 5px 12px;
      color: $label-color-white-1;
      width: 55px;
      border: none;

      &::placeholder {
        text-align: left;
        font: normal normal bold 11px/15px Open Sans;
        color: #969696;
      }

      &:focus {
        outline: none;
      }
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
}
</style>
