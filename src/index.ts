import express, { ErrorRequestHandler } from 'express'
import dotenv from 'dotenv'
import router from './router'
import prisma from './prisma'
import session from 'express-session'
import { randomUUID } from 'crypto'
import ms from 'ms'

dotenv.config()
const port = process.env.PORT ? +process.env.PORT : 4000

async function StartServer() {

    await prisma.$connect()

    const app = express()
    app.use(express.json())
    app.use(session({
        secret: randomUUID(),
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            maxAge: ms('7d'),
            httpOnly: true
        }
    }))
    app.use(router)

    app.use(<ErrorRequestHandler>((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
        
    }))


    app.listen(port, () => {
        console.log(`Backend Start at  ${port}`)
    })
}

StartServer()