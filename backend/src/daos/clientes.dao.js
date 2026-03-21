import db from "../../database/db.js"

class ClientesDao {
    constructor(db) {
        this.db = db
    }

    getAll = async () => {
        try {
            return await this.db`SELECT * FROM clientes ORDER BY nombre ASC`
        } catch (error) {
            console.error("Error en ClientesDao.getAll:", error.message)
            throw error
        }
    }

    getByName = async (name) => {
        try {
            const [cliente] = await this.db`SELECT * FROM clientes WHERE nombre = ${name}`
            return cliente || null
        } catch (error) {
            console.error("Error en ClientesDao.getByName:", error.message)
            throw error
        }
    }

    getById = async (id) => {
        try {
            const [cliente] = await this.db`
                SELECT * FROM clientes 
                WHERE id_cliente = ${id}
            `
            return cliente || null
        } catch (error) {
            console.error("Error en ClientesDao.getById:", error.message)
            throw error
        }
    }

    create = async (clienteData) => {
        const { nombre, direccion, horarios, localidad, particular } = clienteData
        try {
            const [nuevoCliente] = await this.db`
                INSERT INTO clientes (nombre, direccion, horarios, localidad, particular)
                VALUES (${nombre}, ${direccion}, ${horarios}, ${localidad}, ${particular})
                RETURNING *
            `
            return nuevoCliente
        } catch (error) {
            console.error("Error en ClientesDao.create:", error.message)
            throw error
        }
    }

    update = async (id, clienteData) => {
        const { nombre, direccion, horarios, localidad, particular } = clienteData
        try {
            const [clienteActualizado] = await this.db`
                UPDATE clientes
                SET 
                    nombre = ${nombre},
                    direccion = ${direccion},
                    horarios = ${horarios},
                    localidad = ${localidad},
                    particular = ${particular}
                WHERE id_cliente = ${id}
                RETURNING *
            `
            return clienteActualizado || null
        } catch (error) {
            console.error("Error en ClientesDao.update:", error.message)
            throw error
        }
    }

    delete = async (id) => {
        try {
            const result = await this.db`
                DELETE FROM clientes 
                WHERE id_cliente = ${id}
            `
            return result.count > 0
        } catch (error) {
            console.error("Error en ClientesDao.delete:", error.message)
            throw error
        }
    }
}

export const clientesDao = new ClientesDao(db)