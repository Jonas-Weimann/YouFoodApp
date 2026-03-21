import db from "../../database/db.js"

class FinanzasDao {
    constructor(db){
        this.db = db
    }
    getVentas = async () => {
        try {
            const ventas = await this.db`SELECT * FROM ventas ORDER BY fecha_venta DESC`
            return ventas
        } catch (error) {
            console.error("Error en FinanzasDao.getVentas:", error.message)
            throw error
        }
    }

    getRangoVentas = async (inicio, fin) => {
        try {
            const ventas = await this.db`SELECT id_venta AS id, fecha_venta AS fecha, 'Venta de productos' AS descripcion, monto FROM ventas WHERE fecha_venta BETWEEN ${inicio} AND ${fin}`
            return ventas
        } catch (error) {
            console.error("Error en FinanzasDao.getRangoVentas:", error.message)
            throw error
        }
    }

    createVenta = async (data) => {
        try {
            const { id_pedido, fecha_venta, medio_pago, monto } = data
            const [venta] = await this.db`INSERT INTO ventas (id_pedido, fecha_venta, medio_pago, monto) VALUES (${id_pedido}, ${fecha_venta || new Date()}, ${medio_pago}, ${monto}) RETURNING *`
            return venta
        } catch (error) {
            console.error("Error en FinanzasDao.createVenta:", error.message)
            throw error
        }
    }

    updateVenta = async (id, data) => {
        try {
            const { id_pedido, fecha_venta, medio_pago, monto } = data
            const updatedVenta = await this.db`UPDATE ventas SET id_pedido = ${id_pedido}, fecha_venta = ${fecha_venta}, medio_pago = ${medio_pago}, monto = ${monto}  WHERE id_venta = ${id} RETURNING *`
            return updatedVenta[0]
        } catch (error) {
            console.error("Error en FinanzasDao.updateVenta:", error.message)
            throw error
        }
    }

    deleteVenta = async (id) => {
        try {
            await this.db`DELETE FROM ventas WHERE id_venta = ${id}`
            return { message: "Venta eliminada" }
        } catch (error) {
            console.error("Error en FinanzasDao.deleteVenta:", error.message)
            throw error
        }
    }

    getGastos = async () => {
        try {
            const gastos = await this.db`SELECT * FROM gastos ORDER BY fecha_gasto DESC`
            return gastos
        } catch (error) {
            console.error("Error en FinanzasDao.getGastos:", error.message)
            throw error
        }
    }

    getRangoGastos = async (inicio, fin) => {
        try {
            const gastos = await this.db`SELECT id_gasto AS id, fecha_gasto AS fecha, descripcion, monto FROM gastos WHERE fecha_gasto BETWEEN ${inicio} AND ${fin}`
            return gastos
        } catch (error) {
            console.error("Error en FinanzasDao.getRangoGastos:", error.message)
            throw error
        }
    }

    createGasto = async (data) => {
        try {
            const { fecha_gasto, descripcion, categoria, monto } = data
            const [gasto] = await this.db`INSERT INTO gastos (fecha_gasto, descripcion, categoria, monto) VALUES (${fecha_gasto || new Date()}, ${descripcion}, ${categoria}, ${monto}) RETURNING *`
            return gasto
        } catch (error) {
            console.error("Error en FinanzasDao.createGasto:", error.message)
            throw error
        }
    }

    updateGasto = async (id, data) => {
        try {
            const [gasto] = await this.db`UPDATE gastos SET fecha_gasto = ${data.fecha_gasto}, descripcion = ${data.descripcion}, categoria = ${data.categoria}, monto = ${data.monto} WHERE id_gasto = ${id} RETURNING *`
            return gasto
        } catch (error) {
            console.error("Error en FinanzasDao.updateGasto:", error.message)
            throw error
        }
    }

    deleteGasto = async (id) => {
        try {
            await this.db`DELETE FROM gastos WHERE id_gasto = ${id}`
            return { message: "Gasto eliminado" }
        } catch (error) {
            console.error("Error en FinanzasDao.deleteGasto:", error.message)
            throw error
        }
    }

    getCompras = async () => {
        try {
            const compras = await this.db`SELECT * FROM compras ORDER BY fecha_compra DESC`
            return compras
        } catch (error) {
            console.error("Error en FinanzasDao.getCompras:", error.message)
            throw error
        }
    }

    getRangoCompras = async (inicio, fin) => {
        try {
            const compras = await this.db`SELECT id_compra AS id, fecha_compra AS fecha, descripcion, monto FROM compras WHERE fecha_compra BETWEEN ${inicio} AND ${fin}`
            return compras
        } catch (error) {
            console.error("Error en FinanzasDao.getRangoCompras:", error.message)
            throw error
        }
    }

    createCompra = async (data) => {
        try {
            const { fecha_compra, descripcion, medio_pago, monto } = data
            const [compra] = await this.db`INSERT INTO compras (fecha_compra, descripcion, medio_pago, monto) VALUES (${fecha_compra || new Date()}, ${descripcion}, ${medio_pago}, ${monto}) RETURNING *`
            return compra
        } catch (error) {
            console.error("Error en FinanzasDao.createCompra:", error.message)
            throw error
        }
    }

    updateCompra = async (id, data) => {
        try {
            const [compra] = await this.db`UPDATE compras SET fecha_compra = ${data.fecha_compra}, descripcion = ${data.descripcion}, medio_pago = ${data.medio_pago}, monto = ${data.monto} WHERE id_compra = ${id} RETURNING *`
            return compra
        } catch (error) {
            console.error("Error en FinanzasDao.updateCompra:", error.message)
            throw error
        }
    }

    deleteCompra = async (id) => {
        try {
            await this.db`DELETE FROM compras WHERE id_compra = ${id}`
            return { message: "Compra eliminada" }
        } catch (error) {
            console.error("Error en FinanzasDao.deleteCompra:", error.message)
            throw error
        }
    }
}

export const finanzasDao = new FinanzasDao(db)