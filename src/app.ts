import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import redis, { createClient } from "redis"
dotenv.config()

const app:Express = express()
const client = createClient()

const getAllProducts = () => {
    const time = Math.random() * 5000
    return new Promise((resolve) => {
        setTimeout(async() => {
            await client.set("allProducts", JSON.stringify([ "Produto 1", "Produto 2", "Produto 3"]), { EX : 10})
            resolve([ "Produto 1", "Produto 2", "Produto 3"])
        }, 5000)
    })
}

app.get("/", async (req: Request, res: Response) => {
    await client.set("MAE", "ABC")
    const value = await client.get("allProducts")
    console.log(value);
    if(value){
        return res.send(JSON.parse(value))
    } else {
        return res.send(await getAllProducts())
    }
})

const startup = async () => {
    await client.connect()
    app.listen(3000, () => {
        console.log("APP STARTED AT 3000")
    })
}

startup()

