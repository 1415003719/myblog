<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
export default {
  created () {
    console.log(1)
    this.$store.dispatch('featchBlogs')
  },
}
</script>


<style>
</style>
