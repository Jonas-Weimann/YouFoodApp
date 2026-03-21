import sql from '../../database/db.js' 
export default class AuthDao {
    constructor(db) {
        this.db = db
    }
create = async (email, name, password, role) => {
    try {
        const [newUser] = await this.db`
            INSERT INTO usuarios (email, nombre, contrasena, rol) 
            VALUES (${email}, ${name}, ${password}, ${role})
            RETURNING id_usuario, email, nombre, rol
        `;
        return newUser;
    } catch (error) {
        console.error("Error en Service create:", error.message);
        throw new Error('Error al registrar el usuario en la base de datos');
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
        throw new Error('Error interno al buscar el usuario');
    }
}

}

export const authDao = new AuthDao(sql)