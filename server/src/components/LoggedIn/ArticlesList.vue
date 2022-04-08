<template>
  <div class="articlesList">
    <div class="row py-1" v-for="article in articles" :key="article.id">
      <span class="col-4">
        {{
          new Date(article.time).toLocaleDateString(undefined, {
            weekday: "short",
            month: "numeric",
            day: "numeric",
          })
        }}
      </span>
      <span class="col-4">{{ article.category }}</span>
      <span class="col-3 text-end text-nowrap">{{ article.price.toFixed(2) }} €</span>
      <span class="col-1 text-start px-0">
        <img
          class=""
          :src="`${exprReqPre}assets/icons/trash.svg`"
          alt="#"
      /></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["articles", "exprReqPre"],
};
</script>

<style>
.articlesList div:nth-child(2n) {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>