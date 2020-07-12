const path = require('path') // core node module for dirname and filename 
const express = require('express')
const { title } = require('process')
const hbs =  require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname)
// console.log(__filename)

const app = express()

// defining heroku port 
const port = process.env.PORT || 3000



///index.html page file path active
const publicDirectoryPath = path.join(__dirname, '../public')

//customize views directory  by naming views as templates in public folder and use the app.set and viwespath varibale 

const viewsPath = path.join(__dirname, '../templates/views')  // views path 

const partialPath = path.join(__dirname, '../templates/partials')


// setup handbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) //this for views directory change name
hbs.registerPartials(partialPath) 

// setup static directory to serve
app.use(express.static(publicDirectoryPath))  // customize your floder (server)

//render can send dynamic html or json and (send) can send static html or json 


//home page Static 
// app.get('',(req, res) => {

//     res.send('<h1>Weather</h1>')

// })
//OR 
//Home page  Dynamic 
app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Ashish'
    })
    
})

// About Page dynamic 
app.get ('/about', (req,res) => {
    res.render('about', {
        name: 'Asishh',
        title: 'About Me'
    })
})

//help Page static 
// app.get('/help', (req, res) => {

//     res.send([{
//         name:'Ashish',
//         age:27

//     },{
//         name:'sarah',
//         age:27
//     }
// ])
// })

//Dynamic web page help 

app.get('/help', (req, res) => {

    res.render('help', {
        helpText: 'Help page is setup',
        title: 'Help',
        name: 'Ashish'
    })
    })
// // by using core module for the about page

//OR
// app.get('/about',(req, res) =>{
//     res.send('<h1>About</h1>')
// })
//Goal : Update weather endpoint to accept address
//1 . No address ? Send Back an error message 
//2. Address ? send back the satic JSON
// - Add address prperty onto JSON which returns the provided address
//3. Test /weather and /weather ? address=philadelphia

app.get('/weather', (req,res) => {

    if(!req.query.address){
        return  res.render({
             error:'You must prodive a address !'
         })
     }

     geocode(req.query.address, (error,{latitude ,longitude, locationName} = {} ) => {
                    if(error)
                    {
                        return res.send({ error })
                    }else{
                        forecast(latitude,longitude, (error, forecastData) => {
                            if(error){
                                return res.send({error})
                            }
                             res.send({
                                 forecast: forecastData,
                                 locationName,
                                 address: req.query.address
                             })

                        })
                    }
                    
     })
     

    //  console.log(req.query.address) 
    //  res.send({
    //      forecast: 'It is snowing',
    //      location: 'Philadelphia',
    //      address: req.query.address

    //  })


     })



//Example to setup weather API
app.get('/products', (req, res) => {
    
    if(!req.query.search){
       return  res.send({
            error:'You must prodive a search term'
        })
    }
   console.log(req.query.search) 
    res.send({
        products:[]
    })
})

// read data from database or json or html 
// 1st-->Root // app.com  ->Home page 
//2nd//app.com/help
//3rd  //app.com/about


// Goal : setup two new routes
//1. setup an about route and render a page title
//2. setup a weather route and render page title
//3.  Test your by visiting abith in the brwser 

// app.get('/help/*',(req,res) => {

//     res.send('help article not found')
// })


app.get('/help/*', (req,res) =>{

    res.render('404', {
    
            title:'404_help',
            name: 'Ashish_help',
            errorMessage: 'Help artical  Not Found'
    })
    
    })
app.get('*', (req,res) => {

res.render('404', {
        title:'404',
        name: 'Ashish',
        errorMessage: 'Page Not Found'
})
})


app.listen(port , () => {
    console.log('Sever is Up on port '+ port )
})