<template>
  <div class="row m-0">
    <div class="col"></div>
    <div class="col-12 col-sm-10 col-md-8 col-lg-6">
      <!-- status msg -->
      <div
        v-if="msg"
        class="alert"
        :class="err ? 'alert-danger' : 'alert-success'"
      >
        {{ msg }}
      </div>

      <div class="input-group mb-3 col-12 col-lg">
        <span class="input-group-text">Price</span>
        <input type="number" class="form-control" id="price" v-model="price" />
      </div>

      <div class="row">
        <button
          class="btn btn-outline-secondary m-1 col"
          v-for="cat in categories"
          :key="cat"
          @click="() => storeArticle(cat)"
        >
          {{ cat }}
        </button>
      </div>

      <hr />

      <div class="input-group mb-3 col-12 col-lg">
        <span class="input-group-text">New Category</span>
        <input type="text" class="form-control" id="newCat" v-model="newCat" />
      </div>

      <div class="text-end">
        <button class="btn btn-primary m-1" @click="() => storeArticle(newCat, true)">
          Save
        </button>
      </div>
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      price: "",
      newCat: "",
      msg: "",
      err: false,
    };
  },

  methods: {
    storeArticle: function (category, isNew) {
      axios
        .post(`${this.exprReqPre}addArticle`, {
          category: category,
          price: this.price,
        }, { withCredentials: true })
        .then(
          () => {
            this.msg = "Article stored";
            this.err = false;
            this.price = "";
            this.newCat = "";
            if (isNew)
              this.$emit('newArticleAdded');
          },
          () => {
            this.msg = "Article could not be stored!";
            this.err = true;
          }
        );
    },
  },

  props: ["categories", "exprReqPre", "userId"],
  emits: ["newArticleAdded"]
};
</script>

<style>
</style>