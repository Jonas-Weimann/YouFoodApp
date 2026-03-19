import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const isAuthorized = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No autorizado: falta el Bearer Token' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        req.user = decoded;
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado: se requieren permisos de administrador' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

export default isAuthorized