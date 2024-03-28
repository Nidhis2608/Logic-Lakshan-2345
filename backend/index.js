const express = require("express")
const { connection } = require("./config/db")

const app = express()
app.use(express.json())


app.listen(process.env.port, async() => {
	try {
		await connection
		console.log("Connected to the DB")
		console.log(`Server is running at port ${process.env.port}`)
	} catch (err) {
		console.log(err)
	}
})