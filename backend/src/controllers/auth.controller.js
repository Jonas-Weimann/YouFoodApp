import { authService } from '../services/auth.service.js'
import { env } from '../config/env.js';

class AuthController {
    constructor(service) {
        this.service = service
    }
    login = async (req, res, next) => {
        try{
            const { email, password } = req.body
            const user = await this.service.login(email, password)
            const token = this.service.generateToken(user)
            res.cookie('token', token, { httpOnly: true })
            res.status(200).redirect('/dashboard')
            
        } catch (error) {
            next(error)
        }
    }
    register = async (req, res, next) => {
        try {
            const { email, name, password } = req.body
            const role = env.ADMIN_EMAILS.includes(email) ? 'admin' : 'user'
            const user = await this.service.register(email, name, password, role)
            const token = this.service.generateToken(user)
            res.cookie('token', token, { httpOnly: true })
            res.status(201).redirect('/login')
        } catch (error) {
            next(error)
        }
    }
    logout = async (req, res, next) =>{
        try{
            res.clearCookie('token')
            res.redirect('/login')
        } catch (error) {
            next(error)
        }
    }

}

export const authController = new AuthController(authService)