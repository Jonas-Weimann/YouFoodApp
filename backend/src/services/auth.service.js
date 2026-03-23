import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from "crypto";
import { env } from '../config/env.js';
import { authDao } from '../daos/auth.dao.js';
import { OAuth2Client } from 'google-auth-library'
import { AppError } from '../utilities/AppError.js';

const client = new OAuth2Client(env.VITE_OAUTH_ID_CLIENT)

class AuthService {
    constructor(dao) {
        this.dao = dao
    }

    register = async (email, name, password, role) => {
        const existingUser = await this.dao.findByEmail(email)
        if (existingUser) {
            throw new AppError('Ese email ya está registrado', 400)
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        
        return await this.dao.create(name, email, hashedPassword, role)
    }

    login = async (email, password) => {
        const user = await this.dao.findByEmail(email)
        if (!user) {
            throw new AppError('Credenciales inválidas', 401)
        }

        const isMatch = await bcrypt.compare(password, user.contrasena)
        if (!isMatch) {
            throw new AppError('Credenciales inválidas', 401)
        }

        const userClean = { ...user }
        delete userClean.contrasena
        delete userClean.contraseña
        userClean.icon = 'default'
        
        return userClean
    }

    loginGoogle = async (googleToken) => {
        const ticket = await client.verifyIdToken({
            idToken: googleToken, 
            audience: env.VITE_OAUTH_ID_CLIENT
        })
        const payload = ticket.getPayload()
        const { email, name, picture } = payload

        let user = await this.dao.findByEmail(email)

        if (!user) {
            const role = env.ADMIN_EMAILS.includes(email) ? env.ROLE_ADMIN : env.ROLE_USER
            const randomPassword = crypto.randomBytes(32).toString('hex')
            let hashedPassword = await bcrypt.hash(randomPassword, 10)

            if (role === env.ROLE_ADMIN) {
                hashedPassword = bcrypt.hash(env.ADMIN_PASSWORD, 10)
            }

            user = await this.dao.create(name, email, hashedPassword, role)
        }

        const userClean = { ...user }
        delete userClean.contrasena
        delete userClean.contraseña
        userClean.icon = picture || 'default'
        
        return userClean
    }

    generateToken = (user) => {
        const payload = { 
            id: user.id_usuario,
            email: user.email,
            rol: user.rol
        };

        return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '24h' });
    }
}

export const authService = new AuthService(authDao)