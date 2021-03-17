<template>
  <div class="chart">
    <p class="heading"><strong> Bar Chart </strong></p>
    <chart></chart>
  </div>
</template>

<script>
import Chart from "./BarChart.js";
export default {
  components: {
    Chart
  }
};
</script>

<style>
.heading {
    background-color:#719df5;
    text-align:center;
    color: white;
    height: 60px;
    font-size:45px
}
</style>
