let express = require('express')
let app = express()
let url = require('url')

let rates = [];
let minRate = 0;
let maxRate = 0;
let meanRate = 0;
let medianRate = 0;

// respond when a GET request is made to the homepage
// use a response to send things back
// GET method route


app.get('/', (req, res) => {
  res.send('welcome')
})

app.get('/addData', (req, res) => {
    rates.push(req.query.heartRate)
    let sumRates = 0;
    for(let k = 0; k < rates.length; k++){
        sumRates = parseFloat(sumRates) + parseFloat(rates[k])
    }
    
    if(rates.length == 1){
        minRate = req.query.heartRate
        maxRate = req.query.heartRate
    }

    if(req.query.heartRate < minRate){
        minRate = parseFloat(req.query.heartRate)
    }
    if(req.query.heartRate > maxRate){
        maxRate = parseFloat(req.query.heartRate)
    }
    meanRate = sumRates/rates.length;
    rates.sort(function (a, b) {return a-b});
    if(rates.length > 0){
    if(rates.length % 2 == 0){
        medianRate = parseFloat(parseFloat(rates[parseInt(rates.length/2)]) 
        + parseFloat(rates[parseInt(rates.length/2 - 1)]))/2
    }else{
        medianRate = parseFloat(rates[(rates.length)/2])
    }
}
  res.send('added the given heartRate')
})

// GET method route
app.get('/statistics', (req, res) => {
    let returnResponse = '<b>The heart rate calculations are: </b>'+'<br>'+'<br>'
    returnResponse = returnResponse + 'minimumRate: '+ minRate +'<br>'
    returnResponse = returnResponse + 'maximumRate: '+ maxRate +'<br>'
    returnResponse = returnResponse + 'meanRate: '+ meanRate +'<br>'
    returnResponse = returnResponse + 'medianRate: '+ medianRate +'<br>'
    res.send(returnResponse)
  })

let port = process.env.PORT || 3000
app.listen(port, () => console.log('Example app listening on port 3000!'))