import React from 'react'

async function getMusic(){

  
  var req = await fetch("https://m14j005p8j.execute-api.us-west-1.amazonaws.com/dev/getevents?eventType=Music",{
    method: "GET",
    cache: 'no-cache'
  })
  var data  = await req.json();
  console.log(data)
  return data

}

export default async function MusicCatergory(){
  return(
    <div className="bg-gray-100">
      
    </div>
  )
}