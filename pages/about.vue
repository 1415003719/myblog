<template>
  <section class="container">
    <h1>{{result}}</h1>
    <nuxt-link class="button" to="/">
      Home page4555
    </nuxt-link>
  </section>
</template>
<script>
import axios from 'axios'
export default {
  async asyncData () {
    let {data} = await axios.get('http://127.0.0.1:3000/admin/admin')
    return { result: data.result }
  },
  head () {
    return {
      title: `About Page (${this.name}-side)`
    }
  }
}
</script>

<style scoped>
.title
{
  margin-top: 50px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 50px;
}
</style>
