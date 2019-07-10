'use strict'
const Hapi = require('hapi')
const mongoose = require('mongoose')
const server = new Hapi.server({
    host: 'localhost',
    port: 5000,
    routes: {
        cors: true
    }
})



const { createContext, CryptoFactory } = require('sawtooth-sdk/signing')
const fs = require('fs')
const path = require('path')

const env = require('./env')
const context = createContext('secp256k1')
const privateKey = context.newRandomPrivateKey()
const signer = new CryptoFactory(context).newSigner(privateKey)

const output = `PRIVATE_KEY=${privateKey.asHex()}\nPUBLIC_KEY=${signer.getPublicKey().asHex()}\nREST_API_URL=http://localhost:8008`

fs.writeFile(path.resolve(__dirname, './.env'), output, (err) => {
    if (err) {
        return console.log(err)
    }
})

console.log('\nGenerated .env file with public/private keys and REST API URL\n')
console.log(output, '\n')






server.app.db = mongoose.connect(
    'mongodb://localhost/hapijslogin', { useNewUrlParser: true }
)

const init = async() => {
    await server.register({ plugin: require('./routes/Users') }, {
            routes: {
                prefix: '/users'
            }
        })
        .catch(err => {
            console.log(err)
        })
    await server.start()
    console.log(`server running at ${server.info.uri}`)
};

init()