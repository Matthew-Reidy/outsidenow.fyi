"use client";

import React from 'react'
import  Axios  from "axios"
import {useState} from "react"

export default function SignUp(){

  const [Elements, setElements] = useState({
                                              username: "",
                                              password: ""
                                           })

  const [confirmedPW, setConfirmedPW] = useState<string>("")
  async function signup() {

    const url: string = ""
    var res = Axios.post(url)

    
  }

  async function handleChange(e : any){

  }

  function validateConfirmedPassword(): boolean{
    if(Elements.password != confirmedPW){
      return false
    }
    return true
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={signup}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">username</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='text' value={Elements.username} onChange={(e) => handleChange(e.target.value)}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">password</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='text' value={Elements.password} onChange={(e) => handleChange(e.target.value)}/>
          </div>
          <div className="mb-4">

          </div>
              
              <label>confirm password</label>
              <input type='text' onChange={(e) => setConfirmedPW(e.target.value)}/>
              <label>email</label>
              <input type='text' onChange={(e) => handleChange(e.target.value)}/>
          </form>
      </div>
    </div>
  )
}
