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
      <div className="flex justify-center items-start mt-4">
        <h2 className="text-4xl font-bold text-gray-800">Music events in your area</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {
              data?.map((data : any)=>{
                  return <MusicTile key={data.eventid} props={data}/>
              })
          }
          </ul>
      </div>
    </div>
  )
}