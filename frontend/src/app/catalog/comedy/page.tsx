import React from 'react'
import ComedyTile from './ComedyTile';
async function getComedyEvents(){

  
  var req = await fetch("https://m14j005p8j.execute-api.us-west-1.amazonaws.com/dev/getevents?eventType=Comedy",{
    method: "GET",
    cache: 'no-cache'
  })
  var data  = await req.json();
  console.log(data)
  return data

}


export default async function ComedyCatergory(){

  var data = await getComedyEvents()

  return(
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center pt-10">
      <div className="flex justify-center items-start mt-4">
        <h2 className="text-4xl font-bold text-gray-800">Comedy events in your area</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {
            data?.map((data : any) => {
              return <ComedyTile key={data.eventid} props={data}/>
            })
          }
        </ul>
      </div>
    </div>
  )
}