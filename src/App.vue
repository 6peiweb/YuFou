<template lang="pug">
  div#main
    transition(name='fade')
      keep-alive
        router-view 
</template>

<script>
export default {
  name: 'main'
}
</script>
