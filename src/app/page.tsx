
import Link from 'next/link';
export default function Home() {


  return (
    <main className="bg-gray-100 min-h-screen flex flex-col justify-center items-center pt-10">
      <div className="text-center pb-6">
        <img src="" alt="picture of san francisco"></img>
      </div>
      <div className="text-center pb-6">
        <h1 className="text-4xl font-bold text-gray-800">Welcome!</h1>
        <p className="text-gray-600 mt-3">New to the Bay Area? Want to get out more? Check out the events catalogue.</p>
      </div>
      <div className="flex justify-center items-start mt-4">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="catalog/music" className="text-blue-600 font-semibold">
            <li className="border-4 rounded-lg p-4 hover:bg-blue-200">
              Music
            </li>
          </Link>
          <Link href="catalog/comedy" className="text-blue-600 font-semibold">
            <li className="border-4 rounded-lg p-4 hover:bg-blue-200">
              Comedy  
            </li>
          </Link>
          <Link href="catalog/sports" className="text-blue-600 font-semibold">
            <li className="border-4 rounded-lg p-4 hover:bg-blue-200">
              Sports
            </li>
          </Link>
          <Link href="catalog/gardening" className="text-blue-600 font-semibold">
            <li className="border-4 rounded-lg p-4 hover:bg-blue-200">
              Gardening
            </li>
          </Link>
        </ul>
      </div>
    </main>
  )
}
