<template>
  <h2 class="display-6">Overview</h2>
  <div class="row">
    <div class="col-12 col-lg col-xl-4">
      <select
        v-if="selectedMonth"
        class="my-3 form-select"
        v-model="selectedMonth"
        @change="updatePrices"
      >
        <option v-for="month in availMonths" :key="month" :value="month">
          {{
            month.toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
            })
          }}
        </option>
      </select>

      <div>
        <div class="row text-nowrap cum-price" v-for="(price, cat) in prices" :key="cat">
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
import axios from "axios";

export default {
  data() {
    return {
      selectedMonth: undefined,
      firstMonth: undefined,
      prices: {},
    };
  },

  methods: {
    getFirstMonth: function () {
      axios
        .get(`${this.exprReqPre}${this.userId}/firstEntryDate`)
        .then((ret) => {
          let firstDate = new Date(ret.data);
          this.firstMonth = new Date(
            firstDate.getFullYear(),
            firstDate.getMonth(),
            1
          );
        });
    },

    updatePrices: function () {
      axios
        .get(
          `${this.exprReqPre}${
            this.userId
          }/${this.selectedMonth.getFullYear()}/${this.selectedMonth.getMonth()}`
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
          console.log(prices);
        });
    },
  },

  computed: {
    availMonths: function () {
      let availMonths = [];
      let iterMonth = this.firstMonth;
      let i = 0;

      while (iterMonth < this.currentMonth && i < 500) {
        i++;
        availMonths.unshift(iterMonth);
        iterMonth = new Date(
          iterMonth.getFullYear(),
          iterMonth.getMonth() + 1,
          1
        );
      }
      availMonths.unshift(iterMonth);
      return availMonths;
    },

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

  props: ["userId", "exprReqPre", "categories"],

  mounted: function () {
    this.selectedMonth = this.currentMonth;
    this.firstMonth = this.currentMonth;
    this.getFirstMonth();
    this.updatePrices();
  },
};
</script>

<style>
.cum-price:nth-child(2n) {
  background-color: rgba(0,0,0,0.1);
}
</style>