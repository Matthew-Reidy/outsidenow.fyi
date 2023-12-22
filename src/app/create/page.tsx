"use client";

import React, { useState } from 'react';
import Axios from 'axios';

export default function CreateEvent() {
  const [eventName, setEventName] = useState<string>('');
  const [images, setImages] = useState<FileList | null>(null);

    async function postEvent(event: React.FormEvent<HTMLFormElement>): Promise<void>{
        event.preventDefault();
        const url: string = ""
        
        var res = await Axios.post(url)
        
        
        
    }

    function imageUpload(event: React.ChangeEvent<HTMLInputElement>): void {
        if (event.target.files) {
          setImages(event.target.files);
          handleImgChange()
        }
      }
    
      function handleImgChange(): void {
        if (images) {
          const pdfUploadBody: Array<{}> = [{}];
    
          Array.from(images).forEach((file: File) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
    
            reader.onload = () => {
              console.log('File name:', file.name);
              console.log('Base64 data:', reader.result);
            };
          });
        }
      }


    return(
        <div className="bg-gray-100 flex justify-center items-center min-h-screen">
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={postEvent}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name of event</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" onChange={(event) =>{setEventName(event.target.value)}} placeholder="Event Name" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" onChange={(e) =>{}} placeholder="Event Description" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Start date and time</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="datetime-local" onChange={(e) =>{}} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">End date and time</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="datetime-local" onChange={(e) => {}} />
                    </div>
                    <div className="mb-4">
                        <input type="file" id="avatar" accept="image/png, image/jpeg" multiple onChange={(e)=>imageUpload(e)}></input>
                    </div>
                    <div className="text-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>

    )
}