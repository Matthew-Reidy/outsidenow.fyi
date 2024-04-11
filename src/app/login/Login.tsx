'use client'
import React from 'react'
import  Axios  from "axios"
import {useState} from "react"
import { baseurl } from '@/components/constants'

export default function Login(){
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
 
    async function sendLogin(event: any) {
        
        const url: string = `${baseurl.dev}dev/create/login`
    
        const data: object = {
            username : username,
            password: password
        }
    
    
        const res = await Axios.post(url, data)
        
    
        setUsername("")
        setPassword("")
        
        event.preventDefault();
    }

    
    
    return (
        
        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={sendLogin}>
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                <input className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Login</button>
            </form>
        </div>
        
    )
}
