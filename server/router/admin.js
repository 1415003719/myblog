import Router from 'koa-router'
import Blog from './../models/article'

let router = Router()

router.get('/blogs', async (ctx) => {
  let query = ctx.request.query || {}
  try {
    let blogs = await Blog.findAll(query)
    ctx.body = blogs
  } catch (err) {
    ctx.body = {'err': err}
  }
})

router.get('/blog/:id', async (ctx) => {
  let id = ctx.params.id || ''
  let query = {_id: id}
  try {
    let blogs = await Blog.findAll(query)
    ctx.body = blogs
  } catch (err) {
    ctx.body = {'err': err}
  }
})

router.post('/blogs', async (ctx) => {
  // console.log(ctx.request.body)
  let body = ctx.request.body
  try {
    let blog = await Blog.create(body)
    ctx.body = blog
  } catch (err) {
    ctx.body = {'err': err}
  }
})

export default router
