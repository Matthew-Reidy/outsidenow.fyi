import Link from 'next/link';
import { BASE_URL } from '@/components/constants';

async function getEvents(catergory: string){

  
    var req = await fetch(`${BASE_URL}/getevents?eventType=${catergory}`,{
      method: "GET",
      next: {revalidate: 60}
    })
    var data  = await req.json();
    
    return data

}

export default async function event({params} :any) {
    
    const {catergory} = params
    var data = await getEvents(catergory)

    return (
      <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center pt-10">
        <h2 className="text-4xl font-bold text-gray-800">{catergory} events in your area</h2>
        <div className="flex justify-center items-start mt-4">
          
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {
              data?.map((event:any)=>{
                event["catergory"] = catergory
                return <EventPage key={event.eventid} prop={event} />
              })
            }
          </ul>


        </div>
      </div>

  )
}

function EventPage({prop}:any){
  const {eventid, address, locname, state_name, eventtitle, startdate, images, catergory} = prop
  const eventDate = new Date(startdate)
  return(
    <div className="border-4 rounded-lg p-4 hover:bg-blue-200">
      <Link href={`/catalog/${catergory}/${eventid}`}>
          <li>
              <img className="rounded" src='https://outsidenow-assets.s3.us-west-1.amazonaws.com/event-assets/3/football.jpg' alt='event images' height={1000} width={500}></img>
              <h1 className=' pt-5'>{eventtitle}</h1>
              <p className='pt-5'>{`${address}, ${locname}, ${state_name}`}</p>
              <p>{ eventDate.toLocaleDateString('en-US', {weekday: 'long',year: 'numeric', month: 'long',day: 'numeric'})} at {eventDate.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit",  timeZoneName: "short" , timeZone: "America/Los_Angeles"})}</p>
          </li>
      </Link>
      <div className="flex">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" type='button'>Im interested! </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type='button'>Im going! </button>
      </div>
    </div>
  )
}