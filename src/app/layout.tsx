
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Footer from './footer'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'outsidenow.fyi',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

let signedIn : boolean = false

  return (
    <html lang="en">
      <body>
        <div className="flex bg-gray-900 text-white">
          <div className="w-1/2 flex flex-col justify-center items-center p-4">

              <Link href="/" className="hover:text-gray-300 flex items-center">
                outsidenow.fyi
                <img className="ml-2" src='https://outsidenow-assets.s3.us-west-1.amazonaws.com/site-specifc/osnlogo2.png' alt='site log' height='75' width='75'></img>
              </Link>

          </div>

          <div className="w-1/2 p-4 flex justify-end items-end space-x-4">
              <div className="border-4 border-gray-400 hover:border-gray-500 border-solid bg-gray-400 hover:bg-gray-500 rounded w-24 h-12 ">
                <Link href="/create" className="flex items-center justify-center h-full hover:text-white">
                  Create!
                </Link>
              </div>
              {
                signedIn ? <p>Account</p> 
                :
                <div className="border-4 border-gray-400 hover:border-gray-500 border-solid bg-gray-400 hover:bg-gray-500 rounded w-24 h-12">
                  <a className="flex items-center justify-center h-full" href='https://outsidenow.auth.us-west-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=6uqkjma20rgv9lcmvkar8in06t&redirect_uri=http://localhost:3000'>Login</a>
                </div>
              }
          </div>
        </div>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
