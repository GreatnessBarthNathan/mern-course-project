import "express-async-errors"
import * as dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"
import express from "express"
const app = express()
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cloudinary from "cloudinary"

// routers
import jobRouter from "./routes/jobRouter.js"
import authRouter from "./routes/authRouter.js"
import userRouter from "./routes/userRouter.js"

// public
import { dirname } from "path" // with common js this is not needed
import { fileURLToPath } from "url" // with common js this is not needed
import path from "path"

// middlewares
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js"
import { authenticateUser } from "./middleware/authMiddleware.js"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

const __dirname = dirname(fileURLToPath(import.meta.url)) // with common js this acrobatic is not needed

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use(express.static(path.resolve(__dirname, "./public")))
app.use(cookieParser())
app.use(express.json())

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" })
})

app.use("/api/v1/jobs", authenticateUser, jobRouter)
app.use("/api/v1/users", authenticateUser, userRouter)
app.use("/api/v1/auth", authRouter)

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"))
})

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" })
})

app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5100

try {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(port, () => {
    console.log("connected to DB")
    console.log(`server running on PORT ${port}...`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
