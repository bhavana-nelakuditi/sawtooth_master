const dotenv = require('dotenv')

dotenv.config()

const env = {
    validatorUrl: process.env.VALIDATOR_URL || 'tcp://192.168.99.100:4004'
}

module.exports = env
