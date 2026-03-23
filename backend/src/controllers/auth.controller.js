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
            const token = await this.service.generateToken(user)
            res.cookie('token', token, { httpOnly: true })
            res.status(200).json({ 
            message: 'Inicio de sesión exitoso', 
            token, 
            user
        })
        } catch (error) {
            next(error)
        }
    }
    loginGoogle = async (req, res, next) => {
    try {
        const { token: googleToken } = req.body 
        const user = await this.service.loginGoogle(googleToken)
        const token = await this.service.generateToken(user) 

        res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
        res.setHeader("Cross-Origin-Embedder-Policy", "require-corp")
        res.cookie('token', token, { httpOnly: true })

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            user
        })

    } catch (error) {
        next(error)
    }
}
    register = async (req, res, next) => {
        try {
            const { email, name, password } = req.body
            const role = env.ADMIN_EMAILS.includes(email) ? env.ROLE_ADMIN : env.ROLE_USER
            const user = await this.service.register(email, name, password, role)
            const token = await this.service.generateToken(user)
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 })
            res.status(201).json({
                message: 'Usuario registrado con éxito',
                token,
                user
            })
        } catch (error) {
            next(error)
        }
    }
    logout = async (req, res, next) =>{
        try{
            res.clearCookie('token')
            res.status(200).json({ message: 'Sesión cerrada con éxito' })
        } catch (error) {
            next(error)
        }
    }

}

export const authController = new AuthController(authService)