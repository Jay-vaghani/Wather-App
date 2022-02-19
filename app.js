const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")
const { urlencoded } = require("body-parser")

let app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html")
   
})

app.post("/", function(req, res){


    let query = req.body.cityName
    let apiKey = "122c708545781ec6acc9ccb16f381b02&"
    let units = "metric"

    let url = "https://api.openweathermap.org/data/2.5/weather?appid=" +apiKey + "q=" + query + "&units=" + units + "&icon=50d"

    https.get(url, function(data){
        data.on("data", function(response){
            let weatherData = JSON.parse(response)
            let temp = weatherData.main.feels_like
            let weatherDescription = weatherData.weather[0].description
            let weatherIconCode = weatherData.weather[0].icon

            res.write("<h1>The temperature in " + query + " is " + temp + " celsius")
            res.write("<h3> and the Wather is " + weatherDescription + "</h3>")
            res.write("<img src='http://openweathermap.org/img/wn/"+weatherIconCode+"@2x.png'>")
            res.send()
        })
    })
})




app.listen(3000)