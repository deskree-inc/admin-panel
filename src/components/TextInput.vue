<template>
  <div class="text-input-container">
    <label class="label">
      <span v-if="label" class="label-text">{{ label }}</span>
      <input
        :class="{
          'text-input-dark--disabled': disabled,
          'text-input-light': inputTheme === 'light',
          'text-input-dark': inputTheme === 'dark',
        }"
        :type="inputType"
        ref="input"
        @input="$emit('update:modelValue', $event.target.value)"
        v-model="model"
        :placeholder="placeholder"
        :autoFocus="autoFocus"
        :style="{ paddingRight: `${trailingTextWidth + 20}px` }"
        :disabled="disabled"
        @click="onInputClick"
      />
      <button v-if="clearable && !!model" type="button" @click="clearValue" class="clear-button">
        <div class="clear-button-image" />
      </button>
      <div v-if="trailingText" class="trailing-text" :style="{ width: `${trailingTextWidth}px` }">
        {{ trailingText }}
      </div>

      <template v-if="type === 'password' && value.length > 0">
        <transition v-if="showPassword" name="fade">
          <img src="@/assets/icons/hidden.svg" class="eye-icon" alt="eye" @click="toggleShowPassword" />
        </transition>
        <transition v-if="!showPassword" name="fade">
          <img src="@/assets/icons/revealed.svg" class="eye-icon" alt="eye" @click="toggleShowPassword" />
        </transition>
      </template>
    </label>

    <div v-if="info" class="info">
      {{ info }}
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TextInput",
  setup() {
    const input = ref("");
    return { input };
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    inputTheme: {
      type: String,
      default: "dark",
    },
    name: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    maxLength: {
      type: Number,
      default: 0,
    },
    placeholder: {
      type: String,
      default: "",
    },
    mode: {
      type: String,
      default: "eager",
    },
    info: {
      type: String,
      default: "",
    },
    trailingText: {
      type: String,
      default: "",
    },
    trailingTextWidth: {
      type: Number,
      default: 0,
    },
    rules: {
      type: String,
      default: "",
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
    autoFocusOnMount: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    showError: {
      type: Boolean,
      default: false,
    },
    showValidCheckmark: {
      type: Boolean,
      default: false,
    },
    showWarning: {
      type: Boolean,
      default: false,
    },
    customError: {
      type: String,
      default: "",
    },
    showInnerErrorIcon: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    maskType: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: String,
      default: "",
    },
    regex: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      model: this.value,
      showPassword: false,
      inputType: this.type,
    };
  },
  mounted() {
    if (this.autoFocusOnMount) {
      (this.$refs.input as HTMLElement).focus();
    }
  },
  watch: {
    model(currentValue) {
      this.$emit("input", currentValue);
    },
    value(value) {
      if (this.maxLength !== 0) {
        this.model = value.substring(0, this.maxLength);
      } else {
        this.model = value;
      }
    },
  },
  methods: {
    onEnter() {
      this.$emit("onenter");
    },
    clearValue() {
      this.model = "";
    },
    onInputClick() {
      this.$emit("inputClick");
    },
    toggleShowPassword() {
      this.$emit("toggleShowPassword");
      this.showPassword = !this.showPassword;
      if (this.showPassword) {
        this.inputType = "text";
      } else if (!this.showPassword) {
        this.inputType = "password";
      }
    },
    onAccept(value: any) {
      this.model = value;
    },
  },
});
</script>

<style lang="scss" scoped>
.text-input-container {
  display: flex;
  flex-direction: column;
}

.label {
  display: flex;
  flex-direction: column;
  position: relative;
}

.label-text {
  display: flex;
  margin-bottom: 12px;
}

.text-input-dark {
  width: 100%;
  border-radius: 8px;
  padding: 12px 15px 13px;
  background-color: #414141;
  color: #dddddd;
  font-size: 11px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  outline: none;
  border: 2px solid transparent;

  &::placeholder {
    color: #808080;
  }

  &:hover {
    background-color: #6f6f6f;
  }

  &:focus {
    border: 2px solid #5884cb;
  }

  &--error {
    border-color: #c3625e;

    &:focus {
      border-color: #c3625e;
    }
  }

  &--disabled {
    background-color: transparent;
    border: 1px solid #373737;

    &:focus,
    &:hover {
      border: 1px solid #373737;
      background-color: transparent;
    }
  }
}

.text-input-light {
  width: 100%;
  border-radius: 8px;
  padding: 12px 15px 13px;
  background: #dddddd4d 0 0 no-repeat padding-box;
  color: #ffffff;
  font-size: 11px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  outline: none;
  border: 2px solid #dddddd4d;

  &::placeholder {
    color: #ffffff;
    opacity: 60%;
  }

  &:hover {
    background-color: #dddddd4d;
    border: 2px solid #ffffff80;
  }

  &:focus {
    border: 2px solid #ffffff80;
  }

  &--error {
    border-color: #c3625e;

    &:focus {
      border-color: #c3625e;
    }
  }
}

.trailing-text {
  position: absolute;
  right: 30px;
  bottom: 14px;
  color: #969696;
  font-size: 11px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}

.checkmark-icon {
  position: absolute;
  width: 15px;
  height: 15px;
  bottom: 13px;
  right: -20px;
}

.info {
  margin-top: 12px;
  font-size: 11px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #969696;
}

.error {
  margin-top: 5px;
  font-size: 11px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #c3625e;
}

.clear-button {
  position: absolute;
  right: 15px;
  width: 16px;
  height: 16px;
  padding: 4px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  border: none;
  background-color: #262626;
  cursor: pointer;

  &:hover {
    background-color: #6f6f6f;
  }
}

.clear-button-image {
  background-image: url("~@/assets/icons/remove-white.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 100%;
  width: 100%;
}

.inner-error-wrapper {
  position: absolute;
  right: 5px;
  bottom: 8px;

  img {
    width: 16px;
    height: 16px;
  }
}

.warning-container {
  display: flex;
  margin: 14px 0 0 11px;

  .warning-text {
    font-size: 10px;
    font-weight: 600;

    &.light {
      color: $label-color-white-1;
    }
  }
}

.caution-img {
  background-image: url("~@/assets/icons/caution.svg");
  width: 16px;
  height: 14px;
  flex-shrink: 0;
  background-size: cover;
  background-repeat: no-repeat;
  margin-right: 5px;
  background-position: center;
}

.eye-icon {
  position: absolute;
  right: 5px;
  bottom: 12px;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
  }
}
</style>
