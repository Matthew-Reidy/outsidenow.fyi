import { BASE_URL } from '@/components/constants'
import React from 'react'

async function getEventByID(id: number){
  var req = await fetch(`${BASE_URL}/eventdetails?eventid=${id}`, {
    method: "GET"
  })
  var data = await req.json()

  return data
}

export default async function EventPage({params}:any){
  var {address, locname,  state_name } = await getEventByID(params.id)
  
  return(
    <div className="bg-gray-100">
      <p>{`${address}, ${locname} ${state_name}`}</p>
    </div>
  )
}