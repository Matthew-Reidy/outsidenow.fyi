import React from 'react'

async function getSports(){

  
  var req = await fetch("https://m14j005p8j.execute-api.us-west-1.amazonaws.com/dev/getevents?eventType=Music",{
    method: "GET",
    cache: 'no-cache'
  })
  var data  = await req.json();
  console.log(data)
  return data

}


export default async function ComedyCatergory(){
  return(
    <div className="bg-gray-100">
        <h1>comedy goes here</h1>
    </div>
  )
}