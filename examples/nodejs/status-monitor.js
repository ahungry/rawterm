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

function send (m) {
  const port = 12345
  const host = '127.0.0.1'
  let payload = JSON.stringify(m)
  payload = nlPad(payload)
  console.log('Sending over: ', { payload })
  server.send(payload, 0, payload.length, port, host, callback);
}

server.on('listening', function () {
  console.log('we are listening....:', server.address())
})

var y = 1

const escape = () => String.fromCharCode(0x1B)
const term = () => escape() + '['

// The escape code isn't quite working due to u16 vs ascii
const cursor_up = () => {
  y = y + 1

  return term() + '0;' + y + 'H ' + y
}

const cursor_down = () => {
  y = y - 1

  return term() + '0;' + y + 'H ' + y
}

// Each time we get a message, lets send one back.
server.on('message', function (message, remote) {
  // Server usually sends one byte at a time, but maybe special keys can come through.
  // ea = up, eb = down
  if (message.length < 10) {
    console.log({ message, remote })
    if (0xEA === message[0]) message = cursor_up() + 'UP_ARROW'
    if (0xEB === message[0]) message = cursor_down() + 'DOWN_ARROW'
    send("Greetings from js  - you pushed: " + message)
  }
  // send("Did you just push: " + message)
})

server.bind(12346, '127.0.0.1')
