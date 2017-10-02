const {exec} = require('child_process')
const path = require('path')

const supportedShells = [
  'bash',
  'zsh'
]

const execp = (path, envVars) => {
  return new Promise((resolve, reject) => {
    const options = {
      env: envVars
    }
    exec(path, options, (err, stdout, stderr) => {
      if(err) {
        reject(err)
        return
      }
      resolve({stdout, stderr})
    })
  })
}

const pathjoin = (file) => {
  return path.join(__dirname, '..', '/shell_scripts/' + file + '.sh')
}

const validateBody = (body) => {
  if(
    typeof body.password !== 'string' ||
    !body.password ||
    body.password.length < 1
  ) {
    return false
  }

  if(
    !supportedShells.includes(body.shell)
  ) {
    return false
  }

  return true
}

module.exports = app => {
  app.get('/', (request, response) => {
    response.renderHTML('main')
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

    scriptsArr.reduce( (acc, script) => {
      return acc
        .then(({stdout, stderr}) => {
          console.log('stdout: ', stdout, '\nstderr: ', stderr, '\nend')
          execp(pathjoin(script.path), script.envVars)
        })
    }, Promise.resolve({stdout: null, stderr: null}))
      .catch(err => {
        console.error(err)
      })
  })

  return app
}