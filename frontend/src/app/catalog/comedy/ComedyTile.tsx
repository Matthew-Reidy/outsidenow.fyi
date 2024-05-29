import Link from 'next/link';

export default async function ComedyTile({props} :any){
    const {eventid, address, locname, state_name, eventtitle, startdate} = props
    return(
        <div>
            <div className="border-4 rounded-lg p-4 hover:bg-blue-200">
                <li>
                    <Link href={`/catalog/comedy/${eventid}`}>
                        <img className="rounded" src='https://outsidenow-assets.s3.us-west-1.amazonaws.com/event-assets/3/football.jpg' alt='event images' height={1000} width={500}></img>
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
        </div>
    )
}