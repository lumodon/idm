module.exports = app => {
  app.use( (request, response, next) => {
    response.renderHTML = page => {
      function _renderHTML(page, res) {
        res.send(require(`../views/${page}`))
      }
      eval('_renderHTML(page, response)')
    }
    next()
  })

  return app
}
