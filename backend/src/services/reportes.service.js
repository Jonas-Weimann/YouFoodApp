import { reportesDao } from "../daos/reportes.dao.js";
import { crearArchivoReporte } from "../utilities/reportes.js"
import { pedidosDao } from "../daos/pedidos.dao.js"
import { rrhhDao } from "../daos/rrhh.dao.js"
import db from "../../database/db.js"

class ReportesService {
    constructor(dao){
        this.dao = dao
        this.db = db
    }
    getAllReportes = async () => {
        try {
            const reportes = await this.dao.getAll()
            return reportes
        } catch (error){
            console.error("Error en ReportesService.getAll:", error.message)
            throw error
        }
    }
    getReporteById = async (id) => {
        try {
            const reporte = await this.dao.getById(id)
            return reporte
        } catch (error){
            console.error("Error en ReportesService.getById:", error.message)
            throw error
        }
    }

    createReporte = async (reporteData) => {
        try {
            const { tipo, inicio, fin } = reporteData

            const tipoReporte = {
                'Saldo semanal': this._getSaldo,
                'Saldo mensual': this._getSaldo,
                'Stock': this._getStock,
                'Comisiones': this._getComisiones,
                'Pedidos': this._getPedidos
            }
            
            const data = await tipoReporte[tipo](inicio, fin)
            const urlArchivo = await crearArchivoReporte(tipo, data, inicio, fin)
            reporteData.archivo_url = urlArchivo

            const reporte = await this.dao.create(reporteData)
            return reporte
        } catch (error){
            console.error("Error en ReportesService.create:", error.message)
            throw error
        }
    }
    updateReporte = async (id, reporteData) => {
        try {
            const reporte = await this.dao.update(id, reporteData)
            return reporte
        } catch (error){
            console.error("Error en ReportesService.update:", error.message)
            throw error
        }
    }
    deleteReporte = async (id) => {
        try {
            const result = await this.dao.delete(id)
            return result
        } catch (error){
            console.error("Error en ReportesService.delete:", error.message)
            throw error
        }
    }

    _getSaldo = async (inicio, fin) => {
    const ventas = await this.db`SELECT id_venta AS id, fecha_venta AS fecha, 'Venta de productos' AS descripcion, monto FROM ventas WHERE fecha_venta BETWEEN ${inicio} AND ${fin}`;
    const gastos = await this.db`SELECT id_gasto AS id, fecha_gasto AS fecha, descripcion, monto FROM gastos WHERE fecha_gasto BETWEEN ${inicio} AND ${fin}`;
    const compras = await this.db`SELECT id_compra AS id, fecha_compra AS fecha, descripcion, monto FROM compras WHERE fecha_compra BETWEEN ${inicio} AND ${fin}`;
    const data = { ventas, gastos, compras }
        return data
    }

    _getStock = async (inicio, fin) => {
        const compras = await this.db`SELECT * FROM compras WHERE fecha_compra BETWEEN ${inicio} AND ${fin}`
        return compras
    }

    _getPedidos = async (inicio, fin) => {
        const pedidos = await pedidosDao.getByRange(inicio, fin)
        return pedidos
    }

    _getComisiones = async (inicio, fin) => {
        const pedidos = await pedidosDao.getByRange(inicio, fin)
        const empleadoVentas = await rrhhDao.getEmpleadoBySector('Ventas')
        let pedidos_filtrados = []
        let clientes_excluidos = ['Caffe del Doge']
        for (const pedido of pedidos) {
            if (!(pedido.cliente_nombre in clientes_excluidos)){
                pedidos_filtrados.push(pedido)
            }
        }
        pedidos_filtrados.push(empleadoVentas)
        return pedidos_filtrados
    }
}

export const reportesService = new ReportesService(reportesDao)