"use client"

import Link from 'next/link'
import { authConstants } from '../constants'
import { useState, useEffect } from 'react';

export function Signin(){
    const [signedIn, setSignedIn] = useState<boolean>(false)

    useEffect(() => {
        if (!localStorage.getItem("UID") && !localStorage.getItem("accessToken")){
            identityRoutine()
            
        }else{
            setSignedIn(true)
        }
        
    }, [])
    

    return(
        <div>

            {
                signedIn ? 

                  <div className="border-4 border-gray-400 hover:border-gray-500 border-solid bg-gray-400 hover:bg-gray-500 rounded w-24 h-12 ">
                    <Link href="/create" className="flex items-center justify-center h-full hover:text-white">
                      Create!
                    </Link>
                  </div>
                :
                  <div className="border-4 border-gray-400 hover:border-gray-500 border-solid bg-gray-400 hover:bg-gray-500 rounded w-24 h-12">
                    <a className="flex items-center justify-center h-full" href={`https://outsidenow.auth.us-west-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=${authConstants.client_id}&redirect_uri=${authConstants.redirecturi}`}>Login</a>
                  </div>
              }
        </div>

    )
}

async function identityRoutine(){
   
}