import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';

const router = Router()

const { login, register, logout } = authController

router.post('/login', login)
router.post('/register', register)
router.post('/logout', logout)

export default router