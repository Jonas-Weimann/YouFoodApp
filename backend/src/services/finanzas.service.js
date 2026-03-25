import { finanzasDao } from "../daos/finanzas.dao.js";

class FinanzasService {
    constructor(dao){
        this.dao = dao
    }
    getAllVentas = async () => {
        try {
            return await this.dao.getVentas()
        } catch (error) {
            console.error("Error en FinanzasService.getAllVentas:", error.message)
            throw error
        }
    }

    getVentasByRange = async (inicio, fin) => {
        try {
            return await this.dao.getRangoVentas(inicio, fin)
        } catch (error) {
            console.error("Error en FinanzasService.getVentasByRange:", error.message)
            throw error
        }
    }

    createVenta = async (data) => {
        try {
            return await this.dao.createVenta(data)
        } catch (error) {
            console.error("Error en FinanzasService.createVenta:", error.message)
            throw error
        }
    }

    updateVenta = async (id, data) => {
        try {
            return await this.dao.updateVenta(id, data)
        } catch (error) {
            console.error("Error en FinanzasService.updateVenta:", error.message)
            throw error
        }
    }

    deleteVenta = async (id) => {
        try {
            return await this.dao.deleteVenta(id)
        } catch (error) {
            console.error("Error en FinanzasService.deleteVenta:", error.message)
            throw error
        }
    }

    deleteVentaByPedido = async (id_pedido) => {
        try {
            return await this.dao.deleteVentaByPedido(id_pedido)
        } catch (error) {
            console.error("Error en FinanzasService.deleteVentaByPedido:", error.message)
            throw error
        }
    }

    getAllGastos = async () => {
        try {
            return await this.dao.getGastos()
        } catch (error) {
            console.error("Error en FinanzasService.getAllGastos:", error.message)
            throw error
        }
    }

    getGastosByRange = async (inicio, fin) => {
        try {
            return await this.dao.getRangoGastos(inicio, fin)
        } catch (error) {
            console.error("Error en FinanzasService.getGastosByRange:", error.message)
            throw error
        }
    }

    createGasto = async (data) => {
        try {
            return await this.dao.createGasto(data)
        } catch (error) {
            console.error("Error en FinanzasService.createGasto:", error.message)
            throw error
        }
    }

    updateGasto = async (id, data) => {
        try {
            return await this.dao.updateGasto(id, data)
        } catch (error) {
            console.error("Error en FinanzasService.updateGasto:", error.message)
            throw error
        }
    }

    deleteGasto = async (id) => {
        try {
            return await this.dao.deleteGasto(id)
        } catch (error) {
            console.error("Error en FinanzasService.deleteGasto:", error.message)
            throw error
        }
    }

    getAllCompras = async () => {
        try {
            return await this.dao.getCompras()
        } catch (error) {
            console.error("Error en FinanzasService.getAllCompras:", error.message)
            throw error
        }
    }

    getComprasByRange = async (inicio, fin) => {
        try {
            return await this.dao.getComprasReporte(inicio, fin)
        } catch (error) {
            console.error("Error en FinanzasService.getComprasByRange:", error.message)
            throw error
        }
    }

    createCompra = async (data) => {
        try {
            return await this.dao.createCompra(data)
        } catch (error) {
            console.error("Error en FinanzasService.createCompra:", error.message)
            throw error
        }
    }

    updateCompra = async (id, data) => {
        try {
            return await this.dao.updateCompra(id, data)
        } catch (error) {
            console.error("Error en FinanzasService.updateCompra:", error.message)
            throw error
        }
    }

    deleteCompra = async (id) => {
        try {
            return await this.dao.deleteCompra(id)
        } catch (error) {
            console.error("Error en FinanzasService.deleteCompra:", error.message)
            throw error
        }
    }
}

export const finanzasService = new FinanzasService(finanzasDao)