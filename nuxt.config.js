module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
      { name: 'mobile-web-app-capable', content: 'yes' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css', '~node_modules/vuetify/dist/vuetify.min.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  build: {
    vendor: ['axios']
  },
  plugins: ['~/plugins/vuetify', '~/plugins/vuex'],
  modules: [
  ]
}
