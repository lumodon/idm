module.exports = ({shells}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Automater</title>
  <script src="/public/scripts/main.js"></script>
</head>
<body>
  <h1>Welcome to phase 4 automater</h1>
  <div class="instructionsList">
    <div class="instruction">
      <p>Enter your shell password:</p>
      <input id="password" type="password" placeholder="Shell Password"></input>
    </div>
    <div class="instruction">
      <p>Select your shell type</p>
      ${
        (() => {
          let iterator = 0
          return shells.map( shell => {
            return '<input class="shell-input" id="shell' + iterator + '" type="radio" name="shell" value="' + shell + '"/><label for="shell' + (iterator++) + '">' + shell + '</label>'
          }).join(' ')
        })()
      }
    </div>
    <div class="instruction">
      <p>Do final stuff</p>
    </div>
    <button onclick="start()">Start</button>
  </div>
</body>
</html>
`