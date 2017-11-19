<template>
  <main>
    <v-container>
      <v-layout row wrap>
        <v-flex fixed xs12 class="md3">
          <div class="text-xs-center">
            <v-avatar size="125px">
              <img
                class="img-circle elevation-7 mb-1"
                src="https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/lists/1.jpg"
              >
            </v-avatar>
            <h4><span style="font-weight:bold">$Scope</span></h4>
            <h5 class="text-xs-center">Lorem ipsum dolor sit amet</h5>
          </div>
        </v-flex>
        <v-flex xs12 md7 offset-md1 v-if="blog.content !=='undefined'">
          <div v-html="blog.content"></div>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

<script>
export default {
  layout: 'default',
  computed: {
    blog () {
      return this.$store.getters.findBlogById(this.$route.params.id)
    }
  }
}
</script>
