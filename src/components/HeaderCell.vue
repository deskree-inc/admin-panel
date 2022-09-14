<template>
  <div class="header-cell">
    <div class="text-wrapper">
      <span class="name">
        {{ name }}
      </span>
      <span class="type">String</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderCell",
  data() {
    return {
      columnName: "",
      columnRequired: false,
      optionOpen: false,
    };
  },
  props: {
    name: {
      type: String,
    },
  },
});
</script>

<style scoped lang="scss">
.header-cell {
  background: #262626 0 0 no-repeat padding-box;
  border-radius: 10px;
  opacity: 1;
  height: 50px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .text-wrapper {
    display: flex;
    flex-direction: column;
    margin: 0 50px;
    align-items: center;

    .name {
      text-align: center;
      font: normal normal bold 11px/15px Open Sans;
      color: $label-color-white-1;
      display: flex;
    }

    .type {
      text-align: center;
      font: normal normal 600 10px/20px Open Sans;
      color: #969696;
    }
  }

  &.active {
    background-color: $primary-color;

    .name,
    .type {
      color: white;
    }

    button.three-dots-button {
      background-color: $primary-color;
    }
  }

  .sort-icon {
    top: 16px;
    position: absolute;
    left: 12px;
  }

  button.three-dots-button {
    top: 0;
    position: absolute;
    right: 0;
    border: none;
    height: 50px;
    width: 25px;
    border-radius: 0 10px 10px 0;
    background-color: #262626;
    cursor: pointer;
  }

  .options {
    background-color: $primary-color;
    border-radius: 10px;
    padding: 9px 12px;
    right: -80px;
    bottom: -20px;
    z-index: 9;
    position: absolute;

    span {
      text-align: left;
      font: normal normal 600 11px/15px Open Sans;
      letter-spacing: 0;
      color: white;
      opacity: 1;
    }
  }
}
.new-table-row-add-column-modal {
  position: absolute;
  width: calc(190px + 1rem);
  left: 0;
  top: 57px;
  z-index: 9;
}
.new-table-row-add-column-modal-data {
  padding: 18px 15px;
  margin-bottom: 14px;
  border-radius: 12px;
  box-shadow: 4px 43px 50px 0 rgba(0, 0, 0, 0.35);
  background-color: #5884cb;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.new-table-row-add-column-modal-data-type {
  margin-top: 15px;
  width: 100%;
}
.new-table-row-add-column-modal-data-name {
  width: 100%;
}
.new-table-row-add-column-modal-data-required {
  margin-top: 20px;
}

.delete-column-wrapper {
  width: 100%;
  padding-top: 5px;
  border-top: 2px solid #ffffff10;
  display: flex;
  margin-top: 10px;
  button.delete-column {
    border: none;
    outline: none;
    background: none;
    font: normal normal 600 9px/13px Open Sans;
    color: white;
    padding: 10px 0;
    cursor: pointer;
  }
}

.no-options-alert {
  display: flex;
  margin: 14px 0 0 11px;

  .caution-img {
    background-image: url("~@/assets/icons/caution.svg");
    width: 16px;
    height: 14px;
    flex-shrink: 0;
    background-size: cover;
    background-repeat: no-repeat;
    margin-right: 5px;
    background-position: center;

    //@media screen and (min-width: 1920px) {
    //  width: 20px;
    //  height: 17px;
    //  margin-right: 8px;
    //}
  }

  .no-option-text {
    font-size: 10px;
    font-weight: 600;

    //@media screen and (min-width: 1920px) {
    //  font-size: 13px;
    //}
  }
}
</style>
