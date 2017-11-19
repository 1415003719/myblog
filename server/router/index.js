import Router from 'koa-router'
import AdminRouter from './admin'

let router = Router()
router.use('/admin', AdminRouter.routes())

export default router
