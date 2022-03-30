<template>
  <component :is="currentTab"></component>
</template>

<script>
import AccountSettings from "./LoggedIn/AccountSettings.vue";
import AddArticle from "./LoggedIn/AddArticle.vue";
import EditArticles from "./LoggedIn/EditArticles.vue";
import ArticlesOverview from "./LoggedIn/ArticlesOverview.vue";

export default {
  components: {
    account: AccountSettings,
    add: AddArticle,
    edit: EditArticles,
    overview: ArticlesOverview,
  },
  props: ["userId", "currentTab"],
  computed: {
    userName: () => this.userId,
  },
};
</script>

<style>
</style>