<template>
  <v-flex xs12 md5 offset-md2>
    <div v-for="blog in allBlogs" :key="blog.title">
      <v-card class="my-3" hover>
        <v-card-media
          class="white--text"
          height="130px"
          :src="blog.imgUrl"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline red--text">{{ blog.title }}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-text>
          {{ blog.introduction }}
        </v-card-text>
        <v-card-actions>
          <v-btn icon class="red--text">
            <v-icon medium>visibility</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <nuxt-link :to="{ name: 'blogs-id', params:{id:blog._id}}" flat class="blue--text">Read More</nuxt-link>
        </v-card-actions>
      </v-card>
    </div>
    <div class="text-xs-center">
      <v-pagination :length="50" v-model="page" :total-visible="7" circle></v-pagination>
    </div>
  </v-flex>
</template>

<script>
export default {
  data () {
    return {
      page: 1
    }
  },
  computed: {
    allBlogs () {
      return this.$store.state.AllBlogs
    }
  }
}
</script>