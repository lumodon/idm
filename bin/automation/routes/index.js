const path = require('path')
const {supportedShells} = require('../config.json')
const {execPromise, validateBody} = require('../common')

module.exports = app => {
  const _pathjoin = (file) => {
    return path.join(__dirname, '..', '/shell_scripts/' + file + '.sh')
  }

  app.get('/', (request, response) => {
    response.renderHTML('main', {shells: supportedShells})
  })

  app.post('/start', (request, response) => {
    if(!validateBody(request.body)) {
      throw new Error('Body has invalid data')
      return
    }

    const scriptsArr = [
      {
        path: 'python',
        envVars: {PASSWORD: request.body.password}
      },
      {
        path: 'nvm',
        envVars: {SHELL: request.body.shell}
      },
    ]

    // DRY code - we're doing the same thing multiple times,
    // the only thing changing is the path and the environment variables:
    scriptsArr.reduce((acc, script) => {
      return acc
        .then(({stdout, stderr}) => {
          console.log('stdout: ', stdout, '\nstderr: ', stderr, '\nend')
          execPromise(_pathjoin(script.path), script.envVars)
        })
    }, Promise.resolve({stdout: null, stderr: null}))
      .catch(err => {
        console.error(err)
      })
  })

  return app
}