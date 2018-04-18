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

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
// @font-face {
//   font-family: simkai;
//   src: url('source/font/simkai.ttf');
// }

* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "STKaiti","Weibei SC","Xingkai SC","Hanzipen SC";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.tab-item {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}
</style>