function start() {
  const shellRadio = document.querySelectorAll('.shell-input')
    .filter( radio => {
      return radio.checked
    }).value

  console.log(shellRadio)

  const options = {
    method: 'post',
    body: JSON.stringify({
      password: document.getElementById('password').value,
      shell: shellRadio
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  fetch('/start', options)
    .then(result => result.text())
    .then(result => {
      document.body.appendChild(document.createTextNode(result))
    })

}

document.addEventListener("DOMContentLoaded", event => {
  console.log("DOM fully loaded and parsed")
})