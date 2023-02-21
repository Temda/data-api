import { Router } from 'express'

import signUp from './controllers/signUp'
import login from './controllers/login'
import checkAuth from './controllers/checkAuth'
import logout from './controllers/logout'


const router = Router()

router.get('/auth', checkAuth)
router.post('/sign-up', signUp)
router.post('/login', login)
router.get('/logout', logout)



export default router