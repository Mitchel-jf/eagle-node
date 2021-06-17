const express = require('express')
const Client = require('coinbase').Client
require('dotenv').config()

const app = express()
app.use(express.json({ extended: true }))
const { PORT } = process.env

let client = new Client({
    apiKey: 'Aqb9mOpLJydpQ8hf',
    apiSecret: 'tFpCFpzUMLBTuSxVBuQSIcI46Fj2b6hn',
    version: '2018-03-22',
    strictSSL: false
})

app.post('/receive_btc_from_user', (req, res) => {
    client.getAccount('primary', async (err, acct) => {
        if (err)
            return res.status(500).send(`there was an error:\n ${err}`)

        acct.createAddress(null, (err, addr) => {
            if (err)
                return res.status(500).send(`there was an error:\n ${err}`)

            // console.log(addr)
            res.json({ address: addr.address })
        })
    })
})

app.post('/send_btc_to_user', (req, res) => {
    client.getAccount('primary', (err, acct) => {
        acct.sendMoney({
            to: req.body.address,
            amount: 0.1,
            currency: 'BTC'
        }, (err, tx) => {
            if (err) return res.status(400).send(`Error sending BTC to you:\n${err}`)
            console.log(tx)
        })
    })
})

app.listen(PORT, () => console.log(`Server started Successfully on port: ${PORT}`))