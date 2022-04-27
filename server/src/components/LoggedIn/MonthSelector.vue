<template>
  <select
    v-if="selectedMonth"
    class="my-3 form-select"
    v-model="selectedMonth"
    @change="$emit('monthChanged', selectedMonth)"
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
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedMonth: undefined,
      firstMonth: undefined,
    };
  },

  methods: {
    getFirstMonth: function () {
      axios.get(`${this.exprReqPre}firstEntryDate`).then((ret) => {
        if (ret.data != "") {
          let firstDate = new Date(ret.data);
          this.firstMonth = new Date(
            firstDate.getFullYear(),
            firstDate.getMonth(),
            1
          );
          console.log(firstDate)
        }
      });
    },
  },

  computed: {
    currentMonth: function () {
      let today = new Date();
      return new Date(today.getFullYear(), today.getMonth(), 1);
    },

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
  },

  emits: ["monthChanged"],

  props: ["userId", "exprReqPre", "initMonth"],

  mounted: function () {
    this.selectedMonth = this.initMonth;
    this.firstMonth = this.currentMonth;
    this.getFirstMonth();

    this.$emit("monthChanged", this.selectedMonth);
  },
};
</script>

<style></style>
