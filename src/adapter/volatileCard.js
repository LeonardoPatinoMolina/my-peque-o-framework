export class VolatileCardProps{
  constructor(data){
    this.data = {
      id: data.id,
      title: data.title,
      body: data.original_title
    }
  }
}
//apikey 5ab42191e80dab763b2eea835666ce40&
//hash b91a1843f8d721b87e6d361cec1798a5
//https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=d&ts=1&apikey=5ab42191e80dab763b2eea835666ce40&hash=b91a1843f8d721b87e6d361cec1798a5