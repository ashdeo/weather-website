const request = require('postman-request')

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
        response.body.current.precip +' % change of rain')
        
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