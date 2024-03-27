const express= require("express")

const { connection } = require("./config/db.js")


const app=express()
app.use(express.json())


app.listen(3000,async()=>{
    await connection
    console.log("Connected to the DB")
    console.log("Server is running at the port 3000")
})