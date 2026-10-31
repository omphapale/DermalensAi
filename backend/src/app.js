const express = require("express")
const cors = require("cors")



const app = express();


app.use(express.json());
app.use(cors({
   origin: "https://dermalens-ai01.vercel.app/",
   credentials: true
}))


const assessmentRouter = require("./routes/assessmentRoutes")
const chatRouter = require("./routes/chatRoutes")

//routes
app.use("/api/assessment", assessmentRouter)
app.use("/api/chat", chatRouter)




module.exports = app