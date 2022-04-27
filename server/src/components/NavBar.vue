<template>
  <div class="col-md pt-3 px-3 d-md-block">
  <ul class="nav nav-tabs d-md-block">
    <li class="nav-item" >
      <a class="nav-link" :class="currentTab=='add' ? 'active' : ''" aria-current="page" href="#" @click="$emit('switchTab', 'add')">Add</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" :class="currentTab=='overview' ? 'active' : ''" href="#" @click="$emit('switchTab', 'overview')">Overview</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" :class="currentTab=='edit' ? 'active' : ''" href="#" @click="$emit('switchTab', 'edit')">Edit</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" :class="currentTab=='account' ? 'active' : ''" href="#" @click="$emit('switchTab', 'account')">Account</a>
    </li>
  </ul>
  </div>
</template>

<script>
export default {
  emits: ['switchTab'],
  props: ['currentTab']
};
</script>

<style>
</style>