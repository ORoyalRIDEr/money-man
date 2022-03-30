<template>
  <h2 class="display-6 mb-3">Login</h2>

  <div class="row">
    <div class="input-group mb-3 col-12 col-lg">
      <span class="input-group-text">Name</span>
      <input
        type="text"
        class="form-control"
        id="username"
        v-model="username"
      />
    </div>

    <div class="input-group mb-3 col-12 col-lg">
      <span class="input-group-text">Password</span>
      <input
        type="password"
        class="form-control"
        id="password"
        placeholder="Not implemented yet"
        disabled
      />
    </div>
  </div>
  <button type="submit" class="btn btn-primary" @click="$emit('login', username)">
    Submit
  </button>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  emits: ["login"],
};
</script>

<style>
</style>