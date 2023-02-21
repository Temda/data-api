import { RequestHandler } from 'express'
export default <RequestHandler>((req, res) => {
    delete req.session.auth
    res.send({
        message: 'ออกจากระบบเรียบร้อย'
    })
})