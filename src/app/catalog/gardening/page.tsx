import GardeningTile from "./GardeningTitle"


async function getGardeningEvents(){

    var req = await fetch("https://m14j005p8j.execute-api.us-west-1.amazonaws.com/dev/getevents?eventType=Gardening",{
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
            <div className="flex justify-center items-start mt-4">
                <h2 className="text-4xl font-bold text-gray-800">Gardening events in your area</h2>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {
                        data?.map((data : any)=>{
                           return <GardeningTile key={data.eventid} props={data}/>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}