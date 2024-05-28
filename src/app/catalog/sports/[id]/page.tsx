import React from 'react'

async function getEventByID(id: number){
  var req = await fetch(`https://m14j005p8j.execute-api.us-west-1.amazonaws.com/dev/eventdetails?eventid=${id}`, {
    method: "GET"
  })
  var data = await req.json()

  return data
}

export default async function sportEventPage({params}:any){
  var {address, locname,  state_name } = await getEventByID(params.id)
  
  return(
    <div className="bg-gray-100">
      <p>{`${address}, ${locname} ${state_name}`}</p>
    </div>
  )
}