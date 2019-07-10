const { TransactionProcessor } = require('sawtooth-sdk/processor')

const IntegerKeyHandler = require('./int')
const env = require('./env')

const transactionProcessor = new TransactionProcessor(env.validatorUrl)

handler = new IntegerKeyHandler()
transactionProcessor.addHandler(handler)
transactionProcessor.start()