<template>
  <h2 class="display-6">Edit articles</h2>
  <MonthSelector
    :userId="userId"
    :exprReqPre="exprReqPre"
    :initMonth="selectedMonth"
    @monthChanged="(month) => $emit('monthChanged', month)"
  ></MonthSelector>

  <div v-if="msg" class="alert" :class="err ? 'alert-danger' : 'alert-success'">
    {{ msg }}
  </div>

  <!-- small display version -->
  <div class="d-xl-none">
    <ArticlesList
      :articles="articles"
      :exprReqPre="exprReqPre"
      :userId="userId"
      @message="processArticleMsg"
    ></ArticlesList>
  </div>

  <!-- large display version -->
  <div class="row d-none d-xl-flex">
    <div class="col-5">
      <ArticlesList
        :articles="articles.slice(0, Math.ceil(articles.length / 2))"
        :exprReqPre="exprReqPre"
        :userId="userId"
        @message="processArticleMsg"
      ></ArticlesList>
    </div>
    <div class="col-5 offset-1">
      <ArticlesList
        :articles="articles.slice(Math.ceil(articles.length / 2))"
        :exprReqPre="exprReqPre"
        :userId="userId"
        @message="processArticleMsg"
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
      msg: "",
      err: false,
    };
  },

  methods: {
    updateArticles: function () {
      axios
        .get(
          `${this.exprReqPre}${
            this.userId
          }/${this.selectedMonth.getFullYear()}/${this.selectedMonth.getMonth()}`
        )
        .then((ret) => {
          this.articles = ret.data;
        });
    },
    processArticleMsg: function(msg, error) {
      this.msg = msg;
      this.err = error;
      this.updateArticles();
    }
  },

  watch: {
    selectedMonth: function () {
      this.updateArticles();
    },
  },

  props: ["userId", "exprReqPre", "selectedMonth"],
  emits: ["monthChanged"],

  mounted: function () {
    this.updateArticles();
  },
};
</script>

<style>
</style>