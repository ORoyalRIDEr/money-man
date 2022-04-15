<template>
  <small
    :class="msg.err ? 'text-danger' : 'text-success'"
    class="form-text"
    v-html="msg.msg"
  ></small>
</template>

<script>
export default {
  props: ["msg"],
};
</script>

<style>
</style>