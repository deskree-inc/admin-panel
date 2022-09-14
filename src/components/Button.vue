<template>
  <button
      :type="type"
      :class="`button button--${mod} ${disabled ? 'disabled' : ''}`"
      :style="{ width }"
      :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "ButtonPrimary",
  props: {
    type: {
      type: String,
      default: "button",
    },
    mod: {
      type: String,
      default: "primary",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "",
    },
    font: {
      type: String,
      default: "14px",
    },
  },
})
</script>

<style lang="scss" scoped>
.button {
  border: none;
  color: #ddd;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  display: inline-block;
  cursor: pointer;
  font-size: 11px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 15px;
  letter-spacing: normal;
  outline: none;
  align-items: center;

  &:active {
    background-color: $label-color-white-1;
    color: $primary-color;
    border-color: $primary-color;
  }

  &--primary {
    background-color: $primary-color;
    width: 112px;
    border-radius: 8px;

    &:disabled,
    &[disabled] {
      background-color: #455b7e;
    }
  }

  &--empty-state {
    background-color: $primary-color;
    width: 190px;
    border-radius: 10px;
    font-size: 11px;

    &:disabled,
    &[disabled] {
      background-color: #455b7e;
    }
  }

  &--secondary {
    background-color: $secondary-color;
    width: 114px;
    border-radius: 8px;

    &:hover,
    &:focus {
      background-color: #6f6f6f;
    }
  }

  &--success {
    background-color: #45a07d;
    border-radius: 8px;
    width: 112px;

    &:disabled,
    &[disabled] {
      color: rgba(255, 255, 255, 0.3);
    }
  }

  &--danger {
    background-color: #c3625e;
    border-radius: 8px;
    width: 112px;
  }

  &--inline {
    background-color: transparent;
    padding: 8px 14px;
    border-radius: 4px;

    &:hover,
    &:focus {
      background-color: #313c4d;
    }
  }

  &--inline--danger {
    color: #c3625e;
    background-color: transparent;
    padding: 8px 0;
    border-radius: 4px;
    transition: opacity 200ms ease-in;

    &:hover,
    &:focus {
      opacity: 0.5;
    }
  }

  &--inline--primary {
    display: inherit;
    color: $primary-color;
    background-color: transparent;
    padding: 4px 0;
    border-radius: 4px;
    transition: opacity 200ms ease-in;

    &:hover,
    &:focus {
      opacity: 0.5;
    }
  }

  &.disabled {
    filter: opacity(0.5);
    cursor: not-allowed;
  }
}
</style>