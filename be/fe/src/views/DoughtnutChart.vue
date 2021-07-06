<script>
import { Doughnut, mixins } from 'vue-chartjs';
import chartjsPluginDoughnutlabel from "chartjs-plugin-doughnutlabel";
export default{
  extends: Doughnut,chartjsPluginDoughnutlabel,
  mixins: [mixins.reactiveProp],
  props: ['options'],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>

<style>

</style>