import sql from '../../database/db.js' 
import { AppError } from '../utilities/AppError.js'
export default class AuthDao {
    constructor(db) {
        this.db = db
    }
create = async (name, email, password, role) => {
    try {
        const [newUser] = await this.db`
            INSERT INTO usuarios (nombre, email, contrasena, rol) 
            VALUES (${name}, ${email}, ${password}, ${role})
            RETURNING id_usuario, email, nombre, rol
        `;
        return newUser;
    } catch (error) {
        console.error("Error en Service create:", error.message);
        throw new AppError('Error al registrar el usuario en la base de datos', 422);
    }
}

   findByEmail = async (email) => {
    try {
        const users = await this.db`
            SELECT id_usuario, nombre, email, contrasena, rol 
            FROM usuarios 
            WHERE email = ${email}
        `;
        return users.length > 0 ? users[0] : null;
    } catch (error) {
        console.error("Error en findByEmail:", error.message);
        throw new AppError('Error interno al buscar el usuario', 422);
    }
}

}

export const authDao = new AuthDao(sql)