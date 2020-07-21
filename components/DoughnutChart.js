import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: ["dataCollection", "options"],
  mounted() {
    this.renderChart(this.dataCollection, this.options);
  },
  watch: {
    dataCollection() {
      this.renderChart(this.dataCollection, this.options);
    },
  },
};
