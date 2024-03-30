const express = require("express")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.route")
const { performanceRoute } = require("./routes/performance.route")
const adminRoute = require("./routes/admin.router")
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use("/performance",performanceRoute)
app.use("/admin",adminRoute)

app.listen(process.env.port, async() => {
	try {
		await connection
		console.log("Connected to the DB")
		console.log(`Server is running at port ${process.env.port}`)
	} catch (err) {
		console.log(err)
	}
})