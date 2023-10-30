const express = require("express")
const cors = require("cors")
const { connection } = require("./config/db")
const { userRoute } = require("./routes/user.route")
const { postRoute } = require("./routes/post.route")
const { logoutRoute } = require("./routes/logout.route")
require("dotenv").config()
const port = process.env.port || 8080
const app = express()

app.use(cors())

app.use(express.json())

app.use("/users", userRoute)

app.use("/logout", logoutRoute)

app.use("/posts", postRoute)

app.listen(port, async()=>{
    try{
        await connection
        console.log("Connected to DataBase")
    }catch(err){
        console.log(err)
    }
    console.log(`Server is Running on Port ${port}`)
})