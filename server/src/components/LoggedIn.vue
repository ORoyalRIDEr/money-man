<template>
  <component
    :is="currentTab"
    :exprReqPre="exprReqPre"
    :userId="userId"
    :categories="categories"
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
      exprReqPre: "",
    };
  },

  methods: {
    getCategories: function () {
      axios
        .get(`${this.exprReqPre}${this.userId}/getCategories`)
        .then((ret) => {
          this.categories = ret.data;
        });
    },
  },

  props: ["userId", "currentTab", "expressPort"],

  computed: {
    userName: () => this.userId,
  },

  mounted: function () {
    this.exprReqPre = `${window.location.protocol}//${window.location.hostname}:${this.expressPort}/`;
    this.getCategories();
    console.log(this.categories);
  },
};
</script>

<style>
</style>