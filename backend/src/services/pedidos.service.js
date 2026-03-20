import { pedidosDao } from '../daos/pedidos.dao.js'

class PedidosService {
    constructor(dao) {
        this.dao = dao
    }
    createPedido = async (pedidoData) => {
        try {
            return await this.dao.create(pedidoData)
        } catch (error) {
            console.error("Error en PedidosService.createPedido:", error.message)
            throw error
        }
    }
    getAllPedidos = async () => {
        try {
            return await this.dao.getAll()
        } catch (error) {
            console.error("Error en PedidosService.getAllPedidos:", error.message)
            throw error
        }
    }
    getPedidosById = async (id) => {
        try {
            return await this.dao.getById(id)
        } catch (error) {
            console.error("Error en PedidosService.getPedidosById:", error.message)
            throw error
        }
    }
    getPedidosByDate = async (date) => {
        try {
            return await this.dao.getByDate(date)
        } catch (error) {
            console.error("Error en PedidosService.getPedidosByDate:", error.message)
            throw error
        }
    }
    updatePedido = async (id, pedidoData) => {
        try {
            return await this.dao.update(id, pedidoData)
        } catch (error) {
            console.error("Error en PedidosService.updatePedido:", error.message)
            throw error
        }
    }
    deletePedido = async (id) => {
        try {
            return await this.dao.delete(id)
        } catch (error) {
            console.error("Error en PedidosService.deletePedido:", error.message)
            throw error
        }
    }
    updateEstadoPedido = async (id, estado) => {
        try {
            return await this.dao.updateEstado(id, estado)
        } catch (error) {
            console.error("Error en PedidosService.updateEstadoPedido:", error.message)
            throw error
        }
    }
}

export const pedidosService = new PedidosService(pedidosDao)