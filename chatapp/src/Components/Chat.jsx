import React, { useEffect, useState } from 'react'
import { user } from "../Components/Join"
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import socketID from "socket.io-client"
import Message from './Message';
import ReactScrollToBottom from "react-scroll-to-bottom"
import CloseIcon from '@mui/icons-material/Close';

const ENDPOINT = "https://real-time-chat-app-gules.vercel.app/"
let socket;

function Chat() {
  const [id, setId] = useState("")
  const [message, setMessage] = useState([])
  const send = () => {
    const message = document.getElementById("messageinput").value
    const cc = socket.emit('message', { message, id })
    document.getElementById("messageinput").value = " "
  }

  useEffect(() => {
    socket = socketID(ENDPOINT, { transports: ["websocket"] })
    socket.on('connect', () => {
      setId(socket.id)
    })
    socket.emit('joined', { user })

    socket.on('welcome', (data) => {
      setMessage([...message, data])
    })
    socket.on('userJoined', (data) => {
      setMessage([...message, data])

      socket.on('leave', (data) => {
        setMessage([...message, data])
      })
    })
    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [])

  useEffect(() => {
    socket.on('sendMessage', (data) => {
      setMessage([...message, data])
    })
    return () => {
      socket.off()
    }
  }, [message])
  return (
    <>
      <div className='w-full h-screen bg-green-100 flex justify-center item-center p-5 chat_container'>
        <div className='w-96 h-11/12 rounded-md bg-gray-100 drop-shadow-xl flex flex-col chat_screen'>
          <div className='bg-red-400 w-full h-14 rounded-t-md flex items-center justify-between px-5'>
            <h1 className='font-semibold text-lg'>{user}</h1>
            <a href='/'><CloseIcon /></a>
          </div>

          {/* Seeing all messages */}
          <ReactScrollToBottom className='flex-1 p-2 overflow-y-auto'>
            {message.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
          </ReactScrollToBottom>

          {/* Send message sec */}
          <div className='w-full h-14 bg-gray-300 flex justify-around items-center gap-2 rounded-b-md'>
            <div><EmojiEmotionsIcon /></div>
            <input type="text"
              id='messageinput'
              onKeyPress={(e)=>{e.key === 'Enter' ? send() : null}}
              className='w-60 h-9 rounded-md outline-none pl-3'
              placeholder='Enter message'
            />
            <button onClick={send} className='bg-violet-400 px-5 py-1.5 rounded-md'>Send</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat