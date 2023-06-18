import express from "express"
import dotenv from "dotenv"
import dbConnect from "./db/dbConnect";
import bodyParser from "body-parser";
import cors from "cors"
import cookieParser from "cookie-parser";
import helmet from "helmet"
const ErrorHandler = require("./middlewares/ErrorHandler")
const app = express();
dotenv.config();

const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(helmet())

// ####### Api Routing Start ########
import { AuthRouter, BlogRouter, CategoryRouter, SocialRouter } from "./routes";
app.use("/api/auth", AuthRouter)
app.use("/api/social", SocialRouter)
app.use("/api/category", CategoryRouter)
app.use("/api/blog", BlogRouter)


// middleware for handling the error
app.use(ErrorHandler)

const PORT = process.env.PORT!
app.listen(PORT, () => {
    // connecting to the database
    dbConnect();
    console.log("Connected to the server on PORT", PORT)
})