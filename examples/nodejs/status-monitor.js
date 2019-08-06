var udp = require('dgram')

var server = udp.createSocket('udp4')

function callback (m) {
  console.log('Done sending, got: ', { m })
}

const repeat = (n, s) => {
  let acc = ''
  for (i = 0; i < n; i++) {
    acc += s
  }
  return acc
}

function nlPad (s) {
  return repeat(10 - y, '\n') + s
}
function rlPad (s) {
  return repeat(10 - x, ' ') + s
}

function send (s) {
  const port = 12345
  const host = '127.0.0.1'
  // let payload = JSON.stringify(m)
  let payload = s
  payload = rlPad(payload)
  payload = nlPad(payload)
  console.log('Sending over: ', { payload })
  server.send(payload, 0, payload.length, port, host, callback);
}

server.on('listening', function () {
  console.log('we are listening....:', server.address())
})

var y = 0
var x = 0

const escape = () => String.fromCharCode(0x1B)
const term = () => escape() + '['

// The escape code isn't quite working due to u16 vs ascii
const cursor_up = () => {
  y = y + 1

  return x + ', ' + y
}

const cursor_down = () => {
  y = y - 1

  return x + ', ' + y
}

const cursor_left = () => {
  x = x + 1

  return x + ', ' + y
}

const cursor_right = () => {
  x = x - 1

  return x + ', ' + y
}

// Each time we get a message, lets send one back.
server.on('message', function (message, remote) {
  console.log('Got a message')
  // Server usually sends one byte at a time, but maybe special keys can come through.
  // ea = up, eb = down
  if (message.length < 10) {
    console.log({ message, remote })
    if (0xEA === message[0]) message = cursor_up() + 'UP_ARROW'
    if (0xEB === message[0]) message = cursor_down() + 'DOWN_ARROW'
    if (0xE8 === message[0]) message = cursor_left() + 'LEFT_ARROW'
    if (0xE9 === message[0]) message = cursor_right() + 'RIGHT_ARROW'
    // https://misc.flogisoft.com/bash/tip_colors_and_formatting
    const escCode = Buffer.from('1b', 'hex').toString('ascii')
    const color = escCode + '[36m '
    const color2 = escCode + '[91m '
    send(color2 + "Greetings from js  - you pushed: " + color + message)
  }
  // send("Did you just push: " + message)
})

server.bind(12346, '127.0.0.1')
