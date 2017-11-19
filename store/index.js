import Vuex from 'vuex'
import axios from 'axios'
import marked from 'marked'

const store = function () {
  return new Vuex.Store({
    state: {
      AllBlogs: []
    },
    mutations: {
      setAllBlogs (state, blogs) {
        state.AllBlogs = blogs
      }
    },
    actions: {
      featchBlogs ({commit}) {
        axios.get('/admin/blogs').then(function (res) {
          let blogs = res.data || []
          commit('setAllBlogs', blogs)
        }).catch(function (err) {
          console.log(err)
        })
      },
      featchBlogById ({commit}, payload) {
        axios.get('/admin/blog/' + payload.id).then(function (res) {
          console.log(res.data)
          let blog = res.data || []
          commit('setAllBlogs', blog)
        })
      }
    },
    getters: {
      findBlogById: (state, getters) => (id) => {
        if (state.AllBlogs.length === 0) {
          return ''
        } else {
          let blog = state.AllBlogs.find(blog => blog._id.toString() === id.toString())
          let content = blog.content || ''
          blog.content = getters.convertMarkedToHTML(content)
          return blog
        }
      },
      convertMarkedToHTML: (state, getters) => (content) => {
        return marked(content)
      }
    }
  })
}

export default store
