const express = require("express")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.route")
const { performanceRoute } = require("./routes/performance.route")
const { questionRoute } = require("./routes/question.route")
const { quizRoute } = require("./routes/quiz.route")

const app = express()
app.use(express.json())
app.use("/users",userRouter)
app.use("/performance",performanceRoute)
app.use("/question",questionRoute)
app.use("/quiz",quizRoute)

app.listen(process.env.port, async() => {
	try {
		await connection
		console.log("Connected to the DB")
		console.log(`Server is running at port ${process.env.port}`)
	} catch (err) {
		console.log(err)
	}
})