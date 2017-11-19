<template>
 <div id="app">
  <v-app light footer>
    <main>
      <v-container>
        <v-layout row wrap align-center>
          <mine></mine>
          <blog-list></blog-list>
        </v-layout>
      </v-container>
    </main>
    <v-footer class="secondary">
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-3">
            Made with
            <v-icon class="red--text">favorite</v-icon>
            by <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
            and <a class="white--text" href="mailto:costa.huang@outlook.com">Costa Huang</a>
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
  <script src="https://use.fontawesome.com/73c8e2621d.js"></script>
 </div>
</template>

<script>
import BlogList from './../components/BlogList'
import Mine from './../components/Mine'

export default {
  components: {
    BlogList,
    Mine
  },
  data () {
      return {
        title: 'Your Logo'
    }
  }
}
</script>

<style scoped>
</style>
