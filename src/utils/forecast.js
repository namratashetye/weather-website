const request=require('request')

const forecast=(lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=9ebba9c27305616721a8bf868fcc53f9&query=' + lat + ',' + long + '&units=f'
    request({url,json: true},(error,{body})=>{
        if(error){
            callback('unable to connect', undefined)
        }else if(body.error){
            callback('cant find location', undefined)
        }else{
            callback(undefined, 'It is currently '+ body.current.temperature +"degrees out there.but it feels like " + body.current.feelslike )
        }
    })
}

module.exports=forecast