<template>
  <div class="row m-0">
    <div class="col"></div>
    <div class="col-12 col-sm-10 col-md-8 col-lg-6">
      <div class="input-group mb-3 col-12 col-lg">
        <span class="input-group-text">Price</span>
        <input
          type="number"
          class="form-control"
          id="price"
          v-model="price"
        />
      </div>

      <div class="row">
          <button class="btn btn-outline-secondary m-1 col" v-for="cat in categories" :key="cat">{{cat}}</button>
      </div>

      <hr>

      <div class="input-group mb-3 col-12 col-lg">
        <span class="input-group-text">New Category</span>
        <input
          type="text"
          class="form-control"
          id="newCat"
          v-model="newCat"
        />
      </div>

      <button class="btn btn-primary m-1">Save</button>
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
export default {
    data() { return {
        price: '',
        newCat: ''
    }},

    props: ['categories']
};
</script>

<style>
</style>