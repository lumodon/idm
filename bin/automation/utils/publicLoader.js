const fs = require('fs')
const path = require('path')

const fileTypes = {
  '.css': 'text/css',
  '.js': 'application/javascript'
}

module.exports = (req, res) => {
  const potentialFile = req.originalUrl
  fs.readFile(path.join(__dirname, `..${potentialFile}`), (err, contents) => {
    if(err) {
      console.error(err)
      res.send(err)
    }
    else {
      res.set('Content-Type', fileTypes[req.originalUrl.match(/\..*/)[0]])
      res.send(contents)
    }
  })
}