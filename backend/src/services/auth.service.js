import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { env } from '../config/env.js';
import { authDao } from '../daos/auth.dao.js';

class AuthService {
    constructor(dao){
        this.dao = dao
    }

    register = async (email, name, password, role) => {
        try {
            const existingUser = await this.dao.findByEmail(email)
            if(existingUser) {
                throw new Error('User already exists', 400)
            }
            const hashedPassword = await bcrypt.hash(password, 10)
            return await this.dao.create(email, name, hashedPassword, role)
        } catch(error){
            console.log(error)
            throw new Error('Error registering user')
        }
    }
    login = async (email, password) => {
        try {
            const user = await this.dao.findByEmail(email)
            if (!user) {
                throw new Error('Invalid credentials', 401)
            }
            const isMatch = await bcrypt.compare(password, user.contrasena)
            if (!isMatch) {
                throw new Error('Invalid credentials', 401)
            }
            return user
        } catch (error) {
            throw new Error('Error logging in')
        }
    }
    generateToken = async (user) => {
        return jwt.sign({ id: user.id, email: user.email, role: user.rol }, env.JWT_SECRET, { expiresIn: '1h' })
    }
}

export const authService = new AuthService(authDao)