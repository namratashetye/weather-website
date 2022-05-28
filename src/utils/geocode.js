const request= require('request')

const geocode=(address, callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmFtcmF0YTAxIiwiYSI6ImNreXBrdTQ3azBiZXoyb212eG11NG1wajgifQ.z9l5F9NICW7IgWukQVnRfQ&limit=1'
    request({url, json: true},(error,{body})=>{
        if(error){
            callback('unable to connect', undefined)
        }else if(body.features.length===0){
            callback('unable to find loaction',undefined)
        }else{
            callback(undefined,{
                lat: body.features[0].center[0],
                long: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports =geocode