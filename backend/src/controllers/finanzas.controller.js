import { finanzasService } from "../services/finanzas.service.js"

class FinanzasController {
    constructor(service){
        this.service = service
    }
    getAllVentas = async (req, res) => {
        try {
            const ventas = await this.service.getAllVentas()
            res.status(200).json(ventas)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    getVentasByRange = async (req, res) => {
        try {
            const { inicio, fin } = req.query
            const ventas = await this.service.getVentasByRange(inicio, fin)
            res.status(200).json(ventas)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    createVenta = async (req, res) => {
        try {
            const data = req.body
            const nuevaVenta = await this.service.createVenta(data)
            res.status(201).json(nuevaVenta)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    updateVenta = async (req, res) => {
        try {
            const { id } = req.params
            const data = req.body
            const updated = await this.service.updateVenta(id, data)
            if (updated) res.status(200).json(updated)
            else res.status(404).json({ error: "Venta no encontrada" })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    deleteVenta = async (req, res) => {
        try {
            const { id } = req.params
            const deleted = await this.service.deleteVenta(id)
            if (deleted) res.status(200).json({ message: "Venta eliminada correctamente" })
            else res.status(404).json({ error: "Venta no encontrada" })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    deleteVentaByPedido = async (req, res) => {
        try {
            const { id } = req.params
            const deleted = await this.service.deleteVentaByPedido(id)
            if (deleted) res.status(200).json({ message: "Venta eliminada correctamente" })
            else res.status(404).json({ error: "Venta no encontrada" })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    getAllGastos = async (req, res) => {
        try {
            const gastos = await this.service.getAllGastos()
            res.status(200).json(gastos)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    getGastosByRange = async (req, res) => {
        try {
            const { inicio, fin } = req.body
            const gastos = await this.service.getGastosByRange(inicio, fin)
            res.status(200).json(gastos)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    createGasto = async (req, res) => {
        try {
            const data = req.body
            const nuevoGasto = await this.service.createGasto(data)
            res.status(201).json(nuevoGasto)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    updateGasto = async (req, res) => {
        try {
            const { id } = req.params
            const data = req.body
            const updated = await this.service.updateGasto(id, data)
            if (updated) res.status(200).json(updated)
            else res.status(404).json({ error: "Gasto no encontrado" })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    deleteGasto = async (req, res) => {
        try {
            const { id } = req.params
            const deleted = await this.service.deleteGasto(id)
            if (deleted) res.status(200).json({ message: "Gasto eliminado correctamente" })
            else res.status(404).json({ error: "Gasto no encontrado" })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    getAllCompras = async (req, res) => {
        try {
            const compras = await this.service.getAllCompras()
            res.status(200).json(compras)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    getComprasByRange = async (req, res) => {
        try {
            const { inicio, fin } = req.body
            const compras = await this.service.getComprasByRange(inicio, fin)
            res.status(200).json(compras)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    createCompra = async (req, res) => {
        try {
            const data = req.body
            const nuevaCompra = await this.service.createCompra(data)
            res.status(201).json(nuevaCompra)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    updateCompra = async (req, res) => {
        try {
            const { id } = req.params
            const data = req.body
            const updated = await this.service.updateCompra(id, data)
            if (updated) res.status(200).json(updated)
            else res.status(404).json({ error: "Compra no encontrada" })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    deleteCompra = async (req, res) => {
        try {
            const { id } = req.params
            const deleted = await this.service.deleteCompra(id)
            if (deleted) res.status(200).json({ message: "Compra eliminada correctamente" })
            else res.status(404).json({ error: "Compra no encontrada" })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

export const finanzasController = new FinanzasController(finanzasService)