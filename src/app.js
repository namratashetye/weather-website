const express = require('express')
const path= require('path')
const hbs =require('hbs')
const { error } = require('console')
const geocode =require('./utils/geocode')
const forecast =require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))


const app= express()
const port = process.env.PORT || 3000
// Defie pats
const publicDirectoryPath= path.join(__dirname,'../public')

const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.use(express.static('public'))


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "proide a  address  term "
        })
    }
    geocode(req.query.address,(error, {lat, long, location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(lat,long, (error,forecastData)=>{
            if(error){
                return res.send({error}) 
            }
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })
    })
//    res.send({
//        forecast: "it is windy",
//        address: req.query.address
//    })
})

app.get('/',(req, res)=>{
    res.render('index',{
       title:'weather app',
       name: 'nams'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
       title:'about me',
       name: 'nams'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
       title:'help you',
       name: 'nams'
    })
})
app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404',
        name: 'nams',
        errorMessage: 'help page not found'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title:'404',
        name: 'nams',
        errorMessage: 'page not found'
    })
})

// app.get('/help',(req,res)=>{
//     res.send('help page')
// })

// app.get('/about',(req,res)=>{
//     res.send('about this page')
// })

 

app.listen(port, ()=>{
    console.log('server is up at ' + port)
})