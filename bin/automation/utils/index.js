module.exports = app => {
  app.use( (request, response, next) => {
    response.renderHTML = (page, args) => {
      response.send(require(`../views/${page}`)(args))
    }
    next()
  })

  return app
}
