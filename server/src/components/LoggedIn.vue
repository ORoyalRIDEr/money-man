<template>
  <component
    :is="currentTab"
    :exprReqPre="exprReqPre"
    :userId="userId"
    :categories="categories"
    :selectedMonth="selectedMonth"
    @monthChanged="(month) => (selectedMonth = month)"
    @newArticleAdded="getCategories"
  ></component>
</template>

<script>
import AccountSettings from "./LoggedIn/AccountSettings.vue";
import AddArticle from "./LoggedIn/AddArticle.vue";
import EditArticles from "./LoggedIn/EditArticles.vue";
import ArticlesOverview from "./LoggedIn/ArticlesOverview.vue";
import axios from "axios";

export default {
  components: {
    account: AccountSettings,
    add: AddArticle,
    edit: EditArticles,
    overview: ArticlesOverview,
  },

  data() {
    return {
      categories: [],
      selectedMonth: undefined, // used to store value between change of tabs
    };
  },

  methods: {
    getCategories: function () {
      axios
        .get(`${this.exprReqPre}getCategories`, { withCredentials: true })
        .then((ret) => {
          this.categories = ret.data;
        });
    },
  },

  props: ["userId", "currentTab", "exprReqPre"],

  computed: {
    userName: () => this.userId,
    currentMonth: function () {
      let today = new Date();
      return new Date(today.getFullYear(), today.getMonth(), 1);
    },
  },

  mounted: function () {
    this.selectedMonth = this.currentMonth;
    this.getCategories();
  },

  watch: {
    currentTab: function () {
      this.getCategories();
    },
  },
};
</script>

<style>
</style>