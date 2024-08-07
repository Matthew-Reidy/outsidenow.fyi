"use client"

import Link from 'next/link'
import { authConstants } from '../../constants'
import { useState, useEffect } from 'react';

export function Signin(){
    const [signedIn, setSignedIn] = useState<boolean>(false)

    useEffect(() => {
        console.log("checking login")
        if (!localStorage.getItem("UID") && !localStorage.getItem("accessToken") && !localStorage.getItem("refreshToken")){
            identityRoutine()
            
        }else{
            setSignedIn(true)
        }
        
    }, [])
    

  async function identityRoutine(){
    let url = window.location

    const regex = /(?<=\?code=)[^&]+/

    let code = regex.exec(String(url))

    if (code != null){
      console.log(typeof code[0], code[0])
      getToken(code[0])
    }
    
  }
  
  async function getToken(code: any){

    const header = new Headers();
    header.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("client_id", "17i7qe5cblcvb30o2un14g96md");
    urlencoded.append("code", code);
    urlencoded.append("redirect_uri", "http://localhost:3000");

    let req = await fetch("https://outsidenow.auth.us-west-1.amazoncognito.com/oauth2/token",{
      method: "POST",
      headers:header,
      body: urlencoded
    })

    if(!req.ok){
      throw new Error(`token retrieval failed!\n${req.status} ${req.statusText}`)
    }
    
    let tokenResponse = await req.json();
    console.log(tokenResponse)

    localStorage.setItem("accessToken",tokenResponse.access_token)

    localStorage.setItem("refreshToken",tokenResponse.refresh_token)

    let id = await getIdentity()

    localStorage.setItem("UID",id.username)
    localStorage.setItem("email", id.email)

    setSignedIn(true)

  }

  async function getIdentity(){
    let req = await fetch("https://outsidenow.auth.us-west-1.amazoncognito.com/oauth2/userInfo",{
      method:"GET",
      headers:{
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      },
      redirect:"follow"
    })

    if(!req.ok){
      throw new Error(`identity retrieval failed!\n${req.status} ${req.statusText}`)
    }

    let response = await req.json();
    return response
  }

    return(
        <div>
            {
                signedIn ? 
                  <div className="flex space-x-4">
                    <div className="border-4 border-gray-400 hover:border-gray-500 border-solid bg-gray-400 hover:bg-gray-500 rounded w-24 h-12">
                      <Link href="/create" className="flex items-center justify-center h-full hover:text-white">
                        Create!
                      </Link>
                    </div>
                    <div className="border-4 border-gray-400 hover:border-gray-500 border-solid bg-gray-400 hover:bg-gray-500 rounded w-24 h-12">
                      <Link href="/account" className="flex items-center justify-center h-full hover:text-white">
                        My Account
                      </Link>
                    </div>
                  </div>
                :
                  <div className="border-4 border-gray-400 hover:border-gray-500 border-solid bg-gray-400 hover:bg-gray-500 rounded w-24 h-12">
                    <a className="flex items-center justify-center h-full" href={`https://outsidenow.auth.us-west-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=${authConstants.client_id}&redirect_uri=${authConstants.redirecturi}`}>Login</a>
                  </div>
              }
        </div>

    )
}


