import jwt from 'jsonwebtoken'
import config from './../../config/config'

exports.auth = function (ctx, next) {
  const token = ctx.headers['token']
  if (token) {
    const decodedToken = jwt.verify(token, config.tokenSecret)
    if (decodedToken.user) {
      // verify exp
      const nowTime = new Date().getTime()
      if (decodedToken.payload && decodedToken.payload.exp && decodedToken.payload.exp > nowTime) {
        ctx.req.current_user = decodedToken.user
        next()
      } else {
        ctx.body = {'err': 'token invalid'}
      }
    } else {
      ctx.body = {'err': 'token invalid'}
    }
  } else {
    ctx.body = {'err': 'Authentication failed'}
  }
}

exports.login = function (ctx, next) {
  const username = ctx.req.body.username
  const password = ctx.req.body.password
  if (username && password) {
    // find in DB to verify
    const user = {
      _id: 'xxxxxxxxxx',
      username: 'xxxxx'
    }
    const payload = {
      user: user,
      exp: new Date().getTime() + (24 * 60 * 60 * 1000)
    }
    const token = jwt.sign(payload, config.tokenSecret)
    ctx.body = { 'token': token }
  }
}
