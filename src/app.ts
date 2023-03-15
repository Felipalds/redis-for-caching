import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"

dotenv.config()

const app:Express = express()

app.get("/", (req: Request, res: Response) => {
    res.send("<h1> Hello world </h1>")
})

app.listen(3000, () => {
    console.log("APP STARTED AT 3000")
})