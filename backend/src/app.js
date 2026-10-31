const express = require("express")
const cors = require("cors")



const app = express();



app.use(cors({
   origin: ["http://localhost:5173",
   "https://dermalens-ai01.vercel.app"],
   credentials: true
}))
app.use(express.json());

const assessmentRouter = require("./routes/assessmentRoutes")
const chatRouter = require("./routes/chatRoutes")

//routes
app.use("/api/assessment", assessmentRouter)
app.use("/api/chat", chatRouter)




module.exports = app