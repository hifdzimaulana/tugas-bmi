const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false })) // the extended: false precises that the req.body object won't contain values of any type instead of just strings.
app.use(bodyParser.json())

app.post('/bmi', (req, res) => {
    var tinggi = Number(req.body.tinggi) / 100; // convert Centimeter to Meter
    var berat = Number(req.body.berat)

    var bmi = (berat / tinggi ** 2).toFixed(2)

    var status

    switch (true) {
        case (bmi < 18.5):
            status = 'Kekurangan berat badan'
            break;
        case (bmi > 18.4 || bmi < 25):
            status = 'Normal (ideal)'
            break;
        case (bmi > 24.9 || bmi < 30):
            status = 'Kelebihan berat badan'
            break;
        default:
            status = 'Kegemukan (obesitas)'
            break;
    }

    res.send({
        tinggi, berat, bmi, status
    })
})

const port = 1337
app.listen(port, () => {
    console.log(`listening at http://localhost:${port} ...`)
})