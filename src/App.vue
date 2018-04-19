<template>
  <div id="app">
    <router-link tag="div" class="tab-item" to="/register">
      <span class="tab-link">注册</span>
    </router-link>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App'
}
</script>

<style src="./App.scss" lang="scss"></style>