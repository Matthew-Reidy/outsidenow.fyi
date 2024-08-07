"use client";

import React, { useState, useEffect } from 'react';
import {citiesandcatergories, catobj, citiesobj, BASE_URL} from '../../constants'
export default function CreateEvent() {

  const [eventName, setEventName] = useState<string>("");
  const [description, setDescription] = useState<string>("")
  const [images, setImages] = useState<FileList| null>(null);
  const [dateTime, setDateTime] = useState("")
  const [city, setCity] = useState<string>("")
  const [catergory, setCatergory] = useState<string>("")
  const [citiesAndCatergories, setCitiesAndCatergories] = useState<citiesandcatergories>()

  useEffect(() => {

    async function getCitiesAndCatergories(){

      let req =  await fetch(`${BASE_URL}/getcitiesandcatergories`,{
        method: "GET",
        cache: 'no-cache'
      });

      let data  =  await req.json();
      console.log(data)
      setCitiesAndCatergories(data);

    }

    getCitiesAndCatergories();

  }, [])
  
  function postEvent(event: React.FormEvent<HTMLFormElement>){

      event.preventDefault();

      if (images?.length === undefined){

        alert("Must have atleast one image to upload!")

      }else{

        let pdfs = prepareUploadBody()

        const payload : object = {
          uid: localStorage.getItem("UID"),
          name: eventName,
          description: description,
          dateTime : dateTime,
          pdfs: pdfs
        }
        
        console.log(payload)

        fetch(`${BASE_URL}`,{
          method:"POST",
          headers:{
            "content-type":"application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
          },
          body:JSON.stringify(payload)
        })

      }

  }

  function imageUpload(event: React.ChangeEvent<HTMLInputElement>): void {
      if (event.target.files) {
        setImages(event.target.files);
        
      }
    }
  
  function prepareUploadBody(): Array<{}> | undefined {

    if (images !== null) {
      const pdfUploadBody: Array<{}> = [];

      Array.from(images).forEach((file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          pdfUploadBody.push({"filename": file.name, "blob" : reader.result})

        };
      });
      return pdfUploadBody
    }
    
  }


  return(
      <div className="bg-gray-100 flex justify-center items-center min-h-screen">
          <div className="w-full max-w-4xl">
              <h1 className='text-center'>Create an event!</h1>
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={postEvent}>
                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Name of event</label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" onChange={(event) => { setEventName(event.target.value) }} placeholder="Event Name" required/>
                  </div>
                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" onChange={(e) => { setDescription(e.target.value) }} placeholder="Event Description" required/>
                  </div>
                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                      <select className="shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setCity(e.target.value)} required>
                          {

                          citiesAndCatergories?.locations.map((cities: citiesobj)=>{
                            return <option value={cities.locid}>{cities.locname}</option>
                          })
                          
                          }
                      </select>
                  </div>
                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                      <select className="shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setCatergory(e.target.value)} required>
                          {

                            citiesAndCatergories?.catergories.map((catergories: catobj)=>{
                              return <option value={catergories.event_id}>{catergories.event_name}</option>
                            })

                          }
                      </select>
                  </div>
                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" onChange={(e) => { setDescription(e.target.value) }} placeholder="Address" required/>
                  </div>
                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Start date and time</label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="datetime-local" onChange={(e) => { setDateTime(e.target.value) }} required/>
                  </div>
                  <div className="text-center col-span-1 md:col-span-2">
                      <input type="file" accept="image/png, image/jpeg" multiple onChange={(e) => imageUpload(e)}></input>
                  </div>
                  <div className="text-center col-span-1 md:col-span-2">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
                  </div>
              </form>
          </div>
      </div>
  )
}