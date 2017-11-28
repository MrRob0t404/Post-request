const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const app = express()

app.use(logger('dev'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

const fs = require('fs')
const numberFile = "number.json"

app.get('/number', (req, res) => {
    fs.readFile('number.json', 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.send('there is no number')
            }
            return res.send(err)
        }

        // data is a json string
        const numberObj = JSON.parse(data);
        res.send(`the number is ${numberObj.number}`)
    })
})

app.post('/number', (req, res) => {
    console.log("req body:", req.body)
    const jsonVal = JSON.stringify(req.body)
    fs.writeFile('numberFile.json', jsonVal, (err) => {
        if (err) {
            return res.send(err)
        }
        res.send('number updated')
    })
})


const port = 3000;
app.listen(port, () => {
    console.log(`listening to port ${port}`)
})