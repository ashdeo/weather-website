const request = require('postman-request')


//Goal : Add new data to forecast 
// 
//1. Update the forecast string to include new data
//2. Commit your changes
//3. Push your changes to Github and deploy to Heroku 
//4. Test your work in the live application!

const forecast = ( (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=67e2b983509d17fd87d07b816e1ca026&query='+latitude + ', '+longitude
    request({ url: url, json: true },(error, response) => {
        if(error){
            callback('Unable to Connect to internet',undefined)  // low level error , so  string is passed for error
    }
    else if(response.body.error){   //data error
        callback('Location invlaid. Please try another locaiton',undefined)
    }
    else  {    //in case of success
        // console.log(response.body.current.location)
        // console.log(response.body.current.weather_descriptions[0] +'. It is currently '+ 
        // response.body.current.temperature + ' degress out. Ther is a ' + response.body.current.precip +' % change of rain')
 
        callback(undefined,response.body.current.weather_descriptions[0] +'. It is currently '+ 
        response.body.current.temperature + ' degress out. Ther is a ' + 
        response.body.current.precip +' % change of rain'+'\n'+ 'It is currently '+response.body.current.temperature +'degrees out here. It Feels like its '+ response.body.current.feelslike +'degrees. Humudity is '+response.body.current.humidity+' Percentage' )
        
        // callback(undefined,{
        //     temperature: response.body.current.temperature,
        //     weather_descriptions: response.body.current.weather_descriptions,
        //     precip:response.body.current.precip,
        //     locationName: response.body.location.name
        // })
       
    }

})
})

module.exports = forecast