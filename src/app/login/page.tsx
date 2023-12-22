'use client'

import SignUp from './signup'
import Login from './Login'
import {useState} from "react"

export default function loginForm(){

    return(
        <div className="bg-gray-100 flex justify-center items-center h-screen">
            <SignUp/>
        </div>
    )
}