"use client";

import React from 'react'
import  Axios  from "axios"
import {useState} from "react"

export default function SignUp(){

  const [pw1, setPW1] = useState()
  const [pw2, setPW2] = useState()
  const [isMatch, setIsMatch] = useState(true)
  const [confirmedPW, setConfirmedPW] = useState<string>("")
  const [isValid, setIsValid] = useState(true)
  async function signup() {

    

    
  }

  function handlePW1Change(e : any){
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.*[0-9].*[0-9].*[0-9]).{8,}$/

  }

  
  function handlePW2Change(e : any){

  }



  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={signup}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">username</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='text' value={pw1} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">password</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='text' value={pw2} />
            {isValid ? <p></p> : <p className=''>Password is not valid!</p>}
          </div>
          <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">confirm password</label>
              {confirmedPW ? <p></p> : <p className=''>Passwords do not match!</p>}
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='text' />
              <label className="block text-gray-700 text-sm font-bold mb-2">email</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='text' />
          </div>
          <button type='submit'>Sign up</button>
        </form>
      </div>
    </div>
  )
}
