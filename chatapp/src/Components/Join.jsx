import React, { useState } from 'react';
import logo from "../assets/icon.png"
import { Link } from 'react-router-dom';
let user;
const sendUser=()=>{
    user = document.getElementById("userInput").value
    document.getElementById("userInput").value=" "
}
function Join() {
    const [name ,setName] = useState()
  return (
    <>
      <div className='bg-violet-100 w-full h-screen flex justify-center items-center join_container'>
            <div className='w-2/5 bg-violet-300 h-2/4 rounded-md shadow-lg input_container'>
                <div className='w-full h-24 flex justify-center items-center'>
                    <img src={logo}  />
                </div>
                <div className='w-full flex flex-col p-5 justify-center items-center gap-8 mt-5'>
                    <input type="text"
                    id='userInput'
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    className='w-full h-12 rounded-md pl-5 outline-none'
                    placeholder='Enter Your Name'
                    />
                    <Link onClick={(event) => !name ? event.preventDefault():null} to={"/Chat"} ><button onClick={sendUser} className='bg-violet-500 rounded-md px-5 py-2 shadow-md w-56 button_res'>Let's Chat</button></Link>
                </div>      
            </div>
      </div>
    </>
  );
}

export default Join;
export {user}
