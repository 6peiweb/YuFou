<template lang="pug">
  div#app
    transition(:name='animation')
      router-view 
</template>

<script>
export default {
  name: 'app',
  computed: {
    animation () {
      return this.$store.getters.topAnimation
    }
  }
}
</script>
