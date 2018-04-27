<template lang="pug">
  div#app
    transition(name='fade')
      keep-alive
        router-view 
</template>

<script>
export default {
  name: 'app'
}
</script>
