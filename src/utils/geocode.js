const request = require('postman-request')

const geocode =  ((address, callback) =>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZ2VvYXNoIiwiYSI6ImNrYmpoYzR0djBwaGwyb3FucnRtbDNxYW4ifQ.CkmmZIvquZvNYykFmu_0xw&limit=1'

    request({url: url ,json: true},(error, response)=>{
                if(error){
                        callback('Unable to Connect to internet',undefined)  // low level error , so  string is passed for error
                }
                else if(response.body.features.length===0){   //data error
                    callback('Location invlaid. Please try another locaiton',undefined)
                }
                else  {    //in case of success
 
                    callback(undefined,{
                        latitude: response.body.features[0].center[1],
                        longitude: response.body.features[0].center[0],
                        locationName:response.body.features[0].place_name
                    })
                }
                

    })
})


module.exports = geocode