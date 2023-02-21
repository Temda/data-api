import { RequestHandler } from "express";
import { hash } from 'bcrypt'
import prisma from '../prisma'

export default <RequestHandler>(async (req, res) => {
   const count = await prisma.user.count({
        where: {
            email: req.body.email
        }
    })
    if(count>0){
        return res.status(400).send({
            message: 'ที่อยู่ email ซ้ำกัน'
        })
    }
    await prisma.user.create({
        data: {
            email: req.body.email,
            password: await hash(req.body.password, 10)
        }
    })
    res.status(201).send({
        message: `คุณได้สมัครสมาชิก ${req.body.email} เสร็จสิ้น`
    })
})