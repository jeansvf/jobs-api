import express from "express"
import "dotenv/config"
import jobsRouter from "./routers/jobs-router.js"
import connectDB from "./db/connectDB.js"
import authRouter from "./routers/authRouter.js"
import authentication from "./middleware/authentication.js"

connectDB()

const app = express()

app.use("/api/v1", express.json())
app.use("/api/v1/jobs", authentication, jobsRouter)
app.use("/api/v1/auth", authRouter)

app.listen(
    process.env.PORT,
    console.log(`server is listening on port ${process.env.PORT}`)
)
