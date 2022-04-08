<template>
  <h2 class="display-6">Edit articles</h2>
  <MonthSelector
    :userId="userId"
    :exprReqPre="exprReqPre"
    @monthChanged="changeMonth"
  ></MonthSelector>

  <!-- small display version -->
  <div class="d-xl-none">
    <ArticlesList :articles="articles" :exprReqPre="exprReqPre"></ArticlesList>
  </div>

  <!-- large display version -->
  <div class="row d-none d-xl-flex">
    <div class="col-5">
      <ArticlesList
        :articles="articles.slice(0, Math.ceil(articles.length / 2))"
        :exprReqPre="exprReqPre"
      ></ArticlesList>
    </div>
    <div class="col-5 offset-1">
      <ArticlesList
        :articles="articles.slice(Math.ceil(articles.length / 2))"
        :exprReqPre="exprReqPre"
      ></ArticlesList>
    </div>
  </div>
</template>

<script>
import MonthSelector from "./MonthSelector.vue";
import ArticlesList from "./ArticlesList.vue";
import axios from "axios";

export default {
  components: {
    MonthSelector,
    ArticlesList,
  },

  data() {
    return {
      articles: [],
    };
  },

  methods: {
    updateArticles: function (month) {
      axios
        .get(
          `${this.exprReqPre}${
            this.userId
          }/${month.getFullYear()}/${month.getMonth()}`
        )
        .then((ret) => {
          this.articles = ret.data;
          console.log(this.articles);
        });
    },

    changeMonth: function (newMonth) {
      console.log(newMonth);
      this.updateArticles(newMonth);
    },
  },

  props: ["userId", "exprReqPre"],
};
</script>

<style>
</style>