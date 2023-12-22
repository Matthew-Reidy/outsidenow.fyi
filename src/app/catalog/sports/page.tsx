import Axios from 'axios'
import Link from 'next/link';
import { baseurl } from '@/components/constants';



async function getSports(){

  
    var req = await fetch("https://m14j005p8j.execute-api.us-west-1.amazonaws.com/dev/getevents?eventType=Sports",{
      method: "GET",
      cache: 'no-cache'
    })
    var data  = await req.json();
    console.log(data)
    return data

}

export default async function sportsCatergory() {
    var data = await getSports()
    
    return (
      <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center pt-10">
        <h2 className="text-4xl font-bold text-gray-800">Sporting events in your area</h2>
        <div className="flex justify-center items-start mt-4">
          
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {
              data?.map((sports:any)=>{
                return <SportsPage key={sports.eventid} prop={sports}/>
              })
            }
          </ul>


        </div>
      </div>

  )
}

function SportsPage({prop}:any){
  const {eventid, address, locname, state_name, eventtitle, startdate} = prop

  return(

    <div className="border-4 rounded-lg p-4 hover:bg-blue-200">
      <li >
        <img className="rounded" src='https://outsidenow-assets.s3.us-west-1.amazonaws.com/event-assets/3/football.jpg' alt='event images' height={1000} width={500}></img>
        <Link href={`/catalog/sports/${eventid}`}>
          <h1 className=' pt-5'>{eventtitle}</h1>
          <p className='pt-5'>{`${address} ${locname} ${state_name}`}</p>
          <p>{startdate}</p>
        </Link>
      </li>
      <div className="flex">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" type='button'>Im interested! </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type='button'>Im going! </button>
      </div>
    </div>
  )
}