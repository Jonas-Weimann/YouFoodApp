import db from '../../database/db.js'
import { hoy } from '../utilities/fecha.js'

class ReportesDao {
    constructor(db){
        this.db = db
    }
    getAll = async () =>{
        try {
            const reportes = await this.db`SELECT * FROM reportes`
            return reportes
        } catch (error){
            console.error("Error en ReportesDao.getAll:", error.message)
            throw error
        }
    }
    getById = async (id) => {
        try {
            const [reporte] = await this.db`SELECT * FROM reportes WHERE id_reporte = ${id}`
            return reporte
        } catch (error){
            console.error("Error en ReportesDao.getById:", error.message)
            throw error
        }
    }
    create = async (reporteData) => {
        try {
            const { tipo, inicio, fin, archivo_url } = reporteData;
            const [reporte] = await this.db`INSERT INTO reportes (tipo, fecha_reporte, inicio, fin, archivo_url) VALUES (${tipo}, ${new Date()}, ${new Date(inicio)}, ${new Date(fin)}, ${archivo_url}) RETURNING *`
            return reporte
        } catch (error){
            console.error("Error en ReportesDao.create:", error.message)
            throw error
        }
    }
    update = async (id, reporteData) => {
        try {
            const [reporte] = await this.db`UPDATE reportes SET tipo = ${reporteData.tipo}, inicio = ${reporteData.inicio}, fin = ${reporteData.fin}, archivo_url = ${reporteData.archivo_url} WHERE id_reporte = ${id} RETURNING *`
            return reporte
        } catch (error){
            console.error("Error en ReportesDao.update:", error.message)
            throw error
        }
    }
    delete = async (id) => {
        try {
            await this.db`DELETE FROM reportes WHERE id_reporte = ${id}`
            return { message: "Reporte eliminado correctamente" }
        } catch (error){
            console.error("Error en ReportesDao.delete:", error.message)
            throw error
        }
    }
}

export const reportesDao = new ReportesDao(db)