import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import Router from './router/index'
import cros from 'koa-cors'
import connectDB from './lib/connectDB'

const koaBody = require('koa-body')

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

try {
  connectDB()
} catch (err) {
  console.log(err)
}

app.use(koaBody())
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

// Instantiate nuxt.js
const nuxt = new Nuxt(config)

// Build in development
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build().catch(e => {
    console.error(e) // eslint-disable-line no-console
    process.exit(1)
  })
}
app.use(cros())
app.use(Router.routes(), Router.allowedMethods())
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
app.use(ctx => {
  ctx.status = 200 // koa defaults to 404 when it sees that status is unset

  return new Promise((resolve, reject) => {
    ctx.res.on('close', resolve)
    ctx.res.on('finish', resolve)
    nuxt.render(ctx.req, ctx.res, promise => {
      // nuxt.render passes a rejected promise into callback on error.
      promise.then(resolve).catch(reject)
    })
  })
})
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
