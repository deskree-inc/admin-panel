<template>
  <transition name="fade">
    <div v-show="show" class="confirm-modal-backdrop" @click="handleDiscard">
      <div class="confirm-modal" @click="preventPropagation">
        <h3>{{ headerText }}</h3>
        <div :class="classType ? 'confirm-modal-avatar' : 'confirm-modal-body'">
          <slot></slot>
        </div>
        <Button
          mod="success"
          @click="handleConfirm"
          width="100%"
          :type="buttonType"
          :disabled="buttonDisabled"
        >{{ buttonText }}
        </Button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/Button.vue";

export default defineComponent({
  name: "GenericModal",
  components: {
    Button,
  },
  props: {
    buttonText: {
      type: String,
      default: "Save",
    },
    show: {
      type: Boolean,
      default: false,
    },
    buttonDisabled: {
      type: Boolean,
      default: false,
    },
    buttonType: {
      type: String,
      default: "submit",
    },
    headerText: {
      type: String,
      required: true,
    },
    classType: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    preventPropagation(e: Event) {
      e.stopPropagation();
    },
    handleDiscard() {
      this.$emit("discard");
    },
    handleConfirm() {
      this.$emit("confirm");
    },
  },
});
</script>

<style lang="scss" scoped>
.confirm-modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 1000;
}

.confirm-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  h3 {
    font: normal normal 500 13px/15px Open Sans;
    color: $label-color-white-1;
    margin-left: 15px;
    margin-bottom: 15px;
  }
}

.confirm-modal-body {
  background-color: #262626;
  padding: 25px 20px 25px;
  border-radius: 16px;
  box-shadow: 4px 43px 50px 0 rgba(0, 0, 0, 0.16);
  width: 360px;
  font-size: 11px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #dddddd;
  white-space: pre-line;
  margin-bottom: 25px;
}

.confirm-modal-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #262626;
  padding: 25px 20px 25px;
  border-radius: 16px;
  box-shadow: 4px 43px 50px 0 rgba(0, 0, 0, 0.16);
  height: 500px;
  width: 660px;
  font-size: 11px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #dddddd;
  white-space: pre-line;
  margin-bottom: 25px;
}
</style>
