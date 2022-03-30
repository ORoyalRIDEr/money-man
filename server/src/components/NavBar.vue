<template>
  <ul class="nav flex-column">
    <li class="nav-item" >
      <a class="nav-link active" aria-current="page" href="#" @click="$emit('switchTab', 'add')">Add</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#" @click="$emit('switchTab', 'overview')">Overview</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#" @click="$emit('switchTab', 'edit')">Edit</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#" @click="$emit('switchTab', 'account')">Account</a>
    </li>
  </ul>
</template>

<script>
export default {
  emits: ['switchTab']
};
</script>

<style>
</style>