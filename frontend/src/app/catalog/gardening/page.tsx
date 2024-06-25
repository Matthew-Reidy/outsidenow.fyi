import { BASE_URL } from "@/components/constants"
import GardeningTile from "./GardeningTitle"


async function getGardeningEvents(){

    var req = await fetch(`${BASE_URL}/getevents?eventType=Gardening`,{
        method:"GET",
        cache:"no-cache"
    })

    var data = await req.json()

    return data
}


export default async function gardeningCatergory(){

    const data = await getGardeningEvents()
    
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center pt-10">
                <h2 className="text-4xl font-bold text-gray-800">Gardening events in your area</h2>
                <ul className="flex justify-center items-start mt-4">
                    {
                        data?.map((data : any)=>{
                           return <GardeningTile key={data.eventid} props={data}/>
                        })
                    }
                </ul>
        </div>
    )
}