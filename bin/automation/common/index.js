const {exec} = require('child_process')
const {supportedShells} = require('../config.json')

module.exports = {
  execPromise: (path, envVars) => {
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
  },

  validateBody: (body) => {
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
}