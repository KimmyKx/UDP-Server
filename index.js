const dgram = require('dgram')
const server = dgram.createSocket('udp4')

server.on('error', (err) => {
    console.log(`Internal server error: ${err}`)
    server.close()
})

server.on('listening', () => {
    const address = server.address()
    console.log(`server is listening on ${address.address}:${address.port}`)
})

server.on('message', (message, senderInfo) => {
    console.log('Message recieved')
    console.log(senderInfo.address)
    
    server.send(message, senderInfo.port, senderInfo.address, () => {
        console.log(`Message successfully sent to ${senderInfo.address}:${senderInfo.port}`)
    })
})

server.bind(5500)