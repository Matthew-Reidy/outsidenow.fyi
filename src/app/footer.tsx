'use client'

export default function Footer (){
    
    function handleRedir(url: string){
        location.assign(url)
        location.reload()
    }

    return (
        <div className="flex flex-col bg-gray-900 text-white">
            <p className="flex">Contact me!</p>
            <ul >
                <li>
                    <a href="https://www.linkedin.com/in/matthew-reidy-6a6ab2166" onClick={()=> {handleRedir("https://www.linkedin.com/in/matthew-reidy-6a6ab2166")}}>LinkedIn</a>
                </li>
                <li>
                    <p>Email : matthewreidy5@gmail.com</p>
                </li>
                <li>
                    <a href="https://github.com/Matthew-Reidy" onClick={()=> {handleRedir("https://github.com/Matthew-Reidy")}}>github</a>
                </li>
            </ul>
        </div>
    )
}