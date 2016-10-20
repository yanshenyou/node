/*
* @Author: ysy
* @Date:   2016-08-31 16:50:36
* @Last Modified by:   ysy
* @Last Modified time: 2016-08-31 16:53:18
*/

'use strict';空空以空空 16:50:18
const http = require('http')

function Application () {
  this.middlewares = []
}

/**
 * 载入一个中间件
 * @param  {Function} middleware 中间件函数
 * @return {Application}         应用程序对象本身，用于链式调用
 */
Application.prototype.use = function (middleware) {
  // this.middlewares[this.middlewares.length] = middleware
  // for (var i = 0; i < arr.length; i++) { }
  this.middlewares.push(middleware)
  return this
}

/**
 * 监听一个端口并返回一个服务对象
 * @return {http.Server} 服务对象
 */
Application.prototype.listen = function () {
  // const self = this
  const server = http.createServer()
  server.on('request', this._requestListener.bind(this))
  return server.listen.apply(server, arguments)
}

/**
 * 请求处理函数（不要直接调用，私有）
 */
Application.prototype._requestListener = function (req, res) {
  // 执行所有的中间件
  // this.middleware(req, res)
  // this.middlewares.forEach(function (item) {
  //   item(req, res)
  // })
  this.middlewares[0](req, res, this.middlewares[1])
}


// ============ usage ============
const app = new Application()

app.use(function (req, res, next) {
  console.log('1111 start')
  next()
  console.log('1111 end')
})

app.use(function (req, res, next) {
  console.log('2222 start')
  next()
  console.log('2222 end')
})

app.use(function (req, res) {
  res.end('1111')
})

app.listen(3001, (err) => {
  if (err) throw err
  console.log('server is running')
})
