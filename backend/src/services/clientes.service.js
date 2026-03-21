import { clientesDao } from "../daos/clientes.dao.js"

class ClientesService {
    constructor(dao) {
        this.dao = dao
    }
    getAllClientes = async () => {
        try {
            return await this.dao.getAll()
        } catch (error) {
            console.error("Error en ClientesService.getAllClientes:", error.message)
            throw error
        }
    }

    getClienteByName = async (name) => {
        try {
            return await this.dao.getByName(name)
        } catch (error) {
            console.error("Error en ClientesService.getClienteByName:", error.message)
            throw error
        }
    }

    getClienteById = async (id) => {
        try {
            return await this.dao.getById(id)
        } catch (error) {
            console.error("Error en ClientesService.getClienteById:", error.message)
            throw error
        }
    }

    createCliente = async (clienteData) => {
        try {
            return await this.dao.create(clienteData)
        } catch (error) {
            console.error("Error en ClientesService.createCliente:", error.message)
            throw error
        }
    }

    updateCliente = async (id, clienteData) => {
        try {
            return await this.dao.update(id, clienteData)
        } catch (error) {
            console.error("Error en ClientesService.updateCliente:", error.message)
            throw error
        }
    }

    deleteCliente = async (id) => {
        try {
            return await this.dao.delete(id)
        } catch (error) {
            console.error("Error en ClientesService.deleteCliente:", error.message)
            throw error
        }
    }
}

export const clienteService = new ClientesService(clientesDao)