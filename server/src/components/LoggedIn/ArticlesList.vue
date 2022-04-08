<template>
  <!-- List -->
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
      <span class="col-3 text-end text-nowrap"
        >{{ article.price.toFixed(2) }} €</span
      >
      <span class="col-1 text-start px-0">
        <img
          class="btn-trash"
          :src="`${exprReqPre}assets/icons/trash.svg`"
          alt="#"
          @click="() => askForArticleRemoval(article.id)"
      /></span>
    </div>
  </div>

  <!-- remove modal -->
  <div v-if="removingArticle" class="modal d-block" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Remove article</h5>
        </div>
        <div class="modal-body">
          <p>Do you really want to remove the following article?</p>
          <div class="row px-3">
            <p class="col-4"><b>Date</b></p>
            <p class="col-8">
              {{
                new Date(activeArticle.time).toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              }}
            </p>
          </div>
          <div class="row px-3">
            <p class="col-4"><b>Category</b></p>
            <p class="col-8">{{ activeArticle.category }}</p>
          </div>

          <div class="row px-3">
            <p class="col-4"><b>Price</b></p>
            <p class="col-8">{{ activeArticle.price.toFixed(2) }} €</p>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            @click="removeActiveArticle"
          >
            Remove article
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="removingArticle = false"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      activeArticle: false,
      removingArticle: false,
    };
  },

  methods: {
    askForArticleRemoval: function (id) {
      this.activeArticle = this.articles.find((article) => article.id == id);
      this.removingArticle = true;
    },
    removeActiveArticle: function () {
      axios
        .delete(`${this.exprReqPre}${this.userId}/${this.activeArticle.id}`)
        .then(
          () => { // success
            this.$emit('message', "Successfully removed article!", false);
            this.removingArticle = false;
          },
          () => { // fail
            this.$emit('message', "Could not remove article!", true);
            this.removingArticle = false;
          }
        );
    },
  },

  props: ["articles", "exprReqPre", "userId"],
  emits: ["message"]
};
</script>

<style>
.btn-trash {
  cursor: pointer;
}
.articlesList div:nth-child(2n) {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>