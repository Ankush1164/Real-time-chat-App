const http = require("http")
const express = require("express")
const cors = require("cors")
const SocketID = require("socket.io")

const app = express();
const port = 4000 || process.env.port

app.use(cors())

const users =[{}]
app.get("/" , (req,res)=>{
    res.send("This is working")
})

const server = http.createServer(app);

const io = SocketID(server)
io.on("connection" , (socket)=>{
    console.log("Web connection")
    socket.on('joined' ,({user})=>{
        console.log(`${user} is joined`)
        users[socket.id] =user
        socket.broadcast.emit('userJoined' , {user:"Admin" , message:`${users[socket.id]} has joined`})
        socket.emit('welcome' ,{user:"Admin" , message:`Welcome to the Chat , ${users[socket.id]}`})
    })
    socket.on('message',({message , id})=>{
        io.emit('sendMessage' , {user:users[id],message,id})
    })

    socket.on('disconnect' , ()=>{
        socket.broadcast.emit('leave' , {user:"Admin" , message:`${users[socket.id]} has left`})
        console.log("User left")
        })

   
})

server.listen(port , ()=>{
    console.log(`server is listing in http://localhost:${port}`)
})
