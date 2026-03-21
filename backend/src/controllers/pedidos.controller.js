import { pedidosService } from '../services/pedidos.service.js'
import { finanzasService } from '../services/finanzas.service.js'
class PedidosController {
    constructor(service) {
        this.service = service
    }
    createPedido = async (req, res) => {
        try {
            const { id_cliente, fecha_entrega, items } = req.body;
            if (!id_cliente || !items || items.length === 0) {
                return res.status(400).json({ error: "Datos del pedido incompletos" });
            }
            const newPedido = await this.service.createPedido({ id_cliente, fecha_entrega, items })
            res.status(201).json({
                message: "Pedido creado con éxito",
                id_pedido: newPedido.id_pedido,
                total: newPedido.monto
            })
        } catch (error) {
            console.error("Error en PedidosController.createPedido:", error.message)
            res.status(500).json({ error: "Error al crear el pedido" })
        }
    }
    getAllPedidos = async (req, res) => {
        try {
            const pedidos = await this.service.getAllPedidos()
            res.json(pedidos)
        } catch (error) {
            console.error("Error en PedidosController.getAllPedidos:", error.message)
            res.status(500).json({ error: "Error al obtener los pedidos" })
        }
    }
    getPedidosById = async (req, res) => {
        try {
            const { id } = req.params
            const pedido = await this.service.getPedidosById(id)
            if (!pedido) {
                return res.status(404).json({ error: "Pedido no encontrado" })
            }
            res.json(pedido)
        } catch (error) {
            console.error("Error en PedidosController.getPedidosById:", error.message)
            res.status(500).json({ error: "Error al obtener el pedido" })
        }
    }
    getPedidosByDate = async (req, res) => {
        try {
            const { fecha } = req.query
            const pedidos = await this.service.getPedidosByDate(fecha)
            res.json(pedidos)
        } catch (error) {
            console.error("Error en PedidosController.getPedidosByDate:", error.message)
            res.status(500).json({ error: "Error al obtener los pedidos por fecha" })
        }
    }
    updatePedido = async (req, res) => {
        try {
            const { id } = req.params
            const pedidoData = req.body
            const updatedPedido = await this.service.updatePedido(id, pedidoData)
            if (!updatedPedido) {
                return res.status(404).json({ error: "Pedido no encontrado" })
            }
        } catch (error) {
            console.error("Error en PedidosController.updatePedido:", error.message)
            res.status(500).json({ error: "Error al actualizar el pedido" })
        }
    }
    deletePedido = async (req, res) => {
        try {
            const { id } = req.params
            const deletedPedido = await this.service.deletePedido(id)
            if (!deletedPedido) {
                return res.status(404).json({ error: "Pedido no encontrado" })
            }
            res.json({ message: "Pedido eliminado correctamente" })
        } catch (error) {
            console.error("Error en PedidosController.deletePedido:", error.message)
            res.status(500).json({ error: "Error al eliminar el pedido" })
        }
    }
    updateEstadoPedido = async (req, res) => {
        try {
            const { id } = req.params
            const { estado } = req.body
            if (!estado) {
                return res.status(400).json({ error: "Estado del pedido es requerido" })
            }
            const updatedPedido = await this.service.updateEstadoPedido(id, estado)
            if (!updatedPedido) {
                return res.status(404).json({ error: "Pedido no encontrado" })
            }
            if (updatedPedido.estado === "Completado"){
                const data = {
                    id_pedido : updatedPedido.id_pedido,
                    fecha_venta : new Date(),
                    medio_pago : "Otros",
                    monto : updatedPedido.monto
                }
                await finanzasService.createVenta(data)
            }
            return res.status(200).json({
                message: "Estado del pedido actualizado correctamente",
                id_pedido: updatedPedido.id_pedido,
                nuevo_estado: updatedPedido.estado
            })
        } catch (error) {
            console.error("Error en PedidosController.updateEstadoPedido:", error.message)
            res.status(500).json({ error: "Error al actualizar el estado del pedido" })
        }
    }
}

export const pedidosController = new PedidosController(pedidosService)