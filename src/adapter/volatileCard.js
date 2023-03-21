import { BASE_URL_THUMDNAIL_300, imgPLACEHOLDER } from "../lib/globals.js"

export class VolatileCardProps{
  constructor(data){
    let imgUrl
    if(data?.poster_path){
      imgUrl = `${BASE_URL_THUMDNAIL_300}${data.poster_path}`
    }else{
      imgUrl = imgPLACEHOLDER
    }
    this.data = {
      id: data.id,
      imgUrl,
      title: data?.title ?? data?.name,
      body: data?.original_title ?? data?.original_name
    }
  }
}
//apikey 5ab42191e80dab763b2eea835666ce40&
//hash b91a1843f8d721b87e6d361cec1798a5
//https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=d&ts=1&apikey=5ab42191e80dab763b2eea835666ce40&hash=b91a1843f8d721b87e6d361cec1798a5