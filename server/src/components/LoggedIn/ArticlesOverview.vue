<template>
  <h2 class="display-6">Overview</h2>

  <div class="row">
    <div class="col-12 col-lg col-xl-4">
      <MonthSelector
        :userId="userId"
        :exprReqPre="exprReqPre"
        :initMonth="selectedMonth"
        @monthChanged="(month) => $emit('monthChanged', month)"
      ></MonthSelector>

      <div>
        <div
          class="row py-1 text-nowrap cum-price"
          v-for="(price, cat) in prices"
          :key="cat"
        >
          <span class="col-6">{{ cat }}:</span>
          <span class="col-2">{{ Math.round(price) }} €</span>
          <span class="col-1">-></span>
          <span class="col-2">{{ Math.round(price / partsOfMonth) }} €</span>
          <span class="col-1"></span>
        </div>
      </div>
    </div>
    <div class="col-12 col-lg col-xl-8">
      <!-- TODO: Graphic to visualize entries-->
    </div>
  </div>
</template>

<script>
import MonthSelector from "./MonthSelector.vue";
import axios from "axios";

export default {
  components: {
    MonthSelector,
  },

  data() {
    return {
      prices: {},
    };
  },

  methods: {
    updatePrices: function () {
      if (!this.selectedMonth) {
        this.prices = [];
        return;
      }

      axios
        .get(
          `${
            this.exprReqPre
          }getArticles/${this.selectedMonth.getFullYear()}/${this.selectedMonth.getMonth()}`
        )
        .then((ret) => {
          let articles = ret.data;
          let prices = {};
          this.categories.forEach((cat) => (prices[cat] = 0));

          prices = articles.reduce((cats, art) => {
            cats[art.category] += art.price;
            return cats;
          }, prices);

          this.prices = prices;
        });
    },
  },

  computed: {
    currentMonth: function () {
      let today = new Date();
      console.log(new Date(today.getFullYear(), today.getMonth(), 1));
      return new Date(today.getFullYear(), today.getMonth(), 1);
    },

    partsOfMonth: function () {
      let today = new Date();
      let day = today.getDate();
      let dateLastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      let maxDays = dateLastDay.getDate();
      return day / maxDays;
    },
  },

  watch: {
    selectedMonth: function () {
      this.updatePrices();
    },
  },

  props: ["userId", "exprReqPre", "categories", "selectedMonth"],
  emits: ["monthChanged"],

  mounted: function () {
    this.updatePrices();
  },
};
</script>

<style>
.cum-price:nth-child(2n) {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
