import React from 'react'
import MusicTile from './MusicTile';
import { BASE_URL } from '@/components/constants';
async function getMusic(){

  
  var req = await fetch(`${BASE_URL}/getevents?eventType=Music`,{
    method: "GET",
    cache: 'no-cache'
  })
  var data  = await req.json();
  
  return data

}

export default async function MusicCatergory(){
  
  var data = await getMusic()
  
  return(
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center pt-10">
      <h2 className="text-4xl font-bold text-gray-800">Gardening events in your area</h2>
      <ul className="flex justify-center items-start mt-4">`

          {
             data?.map((data : any)=>{
                  return <MusicTile key={data.eventid} props={data}/>
              })
          }
          
          </ul>
    </div>

  )
}