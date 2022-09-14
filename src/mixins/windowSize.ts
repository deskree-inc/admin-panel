import {defineComponent} from "vue";

export default defineComponent({
  data() {
    return {
      isLargeSize: true,
    };
  },
  methods: {
    onResize() {
      this.isLargeSize = window.innerWidth >= 1920;
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  },
  unmounted() {
    window.removeEventListener("resize", this.onResize);
  },
});
