/**
 * For the sake of simplicity, all of the code is in this file.
 * This script holds two endpoints that sends or receives btc from users.
 */
const express = require('express')
// this is the most important library for this script to work
const Client = require('coinbase').Client
require('dotenv').config()

const app = express()
app.use(express.json({ extended: true }))
const { PORT } = process.env
const { APIKEY } = process.env
const { APISECRET } = process.env

// create a new client containing the necessary configs
let client = new Client({
    apiKey: APIKEY,
    apiSecret: APISECRET,
    version: '2018-03-22',
    strictSSL: false
})

// the endpoint gives me some btc, please feel free to test it :)
app.get('/receive_btc_from_user', (req, res) => {
    // first fetch my acct
    client.getAccount('primary', async (err, acct) => {
        if (err)
            return res.status(500).json({ err: `there was an error:\n ${err}` })
        // Then create a new btc address. 
        // This is really important so that I can listen events
        // for each payment. One address per payment.
        acct.createAddress(null, (err, addr) => {
            if (err)
                return res.status(500).json({ err: `there was an error:\n ${err}` })
            // send the address to the client
            res.json({ address: addr.address })
        })
    })
})

// this endpoint takes btc from me :(
// the recieving address must be added as a json body to this request
// as well as the amount
app.post('/send_btc_to_user', (req, res) => {
    // first fetch my acct
    client.getAccount('primary', (err, acct) => {
        // perform the send btc action with the provided parameters.
        acct.sendMoney({
            to: req.body.address,
            amount: req.body.amount,
            currency: 'BTC'
        }, (err, tx) => {
            if (err) return res.status(400).send({ err: `Error sending BTC to you:\n${err}` })
            console.log(tx)
        })
    })
})

// Listen for requests and serve this app to clients
app.listen(PORT, () => console.log(`Server started Successfully on port: ${PORT}`))