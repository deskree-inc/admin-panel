<template>
  <div class="checkbox-inline-container">
    <label tabindex="1">
      <input
        v-if="!onlyTrueOption"
        class="checkbox-inline-input"
        type="checkbox"
        v-model="model"
        :value="checkboxValue"
        :name="name"
        @change="handleChange"
      />
      <input
        v-else
        class="checkbox-inline-input"
        type="checkbox"
        :value="checkboxValue"
        :name="name"
        @change="handleChange"
      />
      <div :class="`checkbox-ui checkbox-ui--${mod}`">
        <div
          :class="{
            'checkbox-box': true,
            'checkbox-box--checked': model,
          }"
        />
        <div class="checkbox-title">
          <span v-html="text"></span>
        </div>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "CheckboxInline",
  props: {
    checkboxValue: {
      required: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
    mod: {
      type: String,
      default: "primary",
    },
    onlyTrueOption: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      model: this.value,
    };
  },
  watch: {
    value(currentValue) {
      this.model = currentValue;
    },
  },
  methods: {
    handleChange() {
      this.$emit("input", this.model);
    },
  },
});
</script>

<style lang="scss" scoped>
.checkbox-inline-container {
  label {
    outline: none;
  }
}

.checkbox-inline-input {
  display: none;
}
.checkbox-ui {
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  &--primary {
    .checkbox-box {
      background-color: rgba(221, 221, 221, 0.3);
      margin-right: 10px;
    }
    .checkbox-title {
      font-size: 11px;
    }
    .checkbox-box--checked {
      background-color: #5884cb;
    }
  }
  &--info {
    .checkbox-box {
      background-color: #5884cb;
      margin-right: 10px;
    }
    .checkbox-title {
      color: #5884cb;
      font-size: 11px;
    }
  }
  &--success {
    .checkbox-box {
      background-color: #45a07d;
      margin-right: 10px;
    }
    .checkbox-title {
      color: #45a07d;
      font-size: 11px;

      //@media screen and (min-width: 1920px) {
      //  font-size: 14px;
      //}
    }
  }
  &--danger {
    .checkbox-box {
      background-color: #c3625e;
      margin-right: 10px;
    }
    .checkbox-title {
      color: #c3625e;
      font-size: 11px;
    }
  }
  &--warn {
    .checkbox-box {
      background-color: #b49646;
      margin-right: 10px;
    }
    .checkbox-title {
      color: #b49646;
      font-size: 11px;
    }
  }
  &--gray {
    .checkbox-box {
      background-color: #a2a2a2;
      margin-right: 10px;
    }
    .checkbox-title {
      color: #a2a2a2;
      font-size: 11px;
    }
  }
}
.checkbox-box {
  border-radius: 4px;
  width: 16px;
  height: 16px;
  background-color: rgba(221, 221, 221, 0.3);
  margin-right: 5px;

  &--checked {
    background-image: url("~@/assets/icons/checkmark-light-blue.svg");
    background-position: center;
  }
}
.checkbox-title {
  font-size: 10px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #fff;
}

</style>
