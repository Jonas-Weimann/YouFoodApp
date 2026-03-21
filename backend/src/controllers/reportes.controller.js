import { reportesService } from "../services/reportes.service.js"

class ReportesController {
    constructor(service){
        this.service = service
    }
    createReporte = async (req, res) => {
        try{
            const reportesData = req.body
            const newReporte = await this.service.createReporte(reportesData)
            res.status(201).json(newReporte)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    getAllReportes = async (req, res) => {
        try{
            const reportes = await this.service.getAllReportes()
            res.status(200).json(reportes)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    getReporteById = async (req, res) => {
        try{
            const { id } = req.params
            const reporte = await this.service.getReporteById(id)
            if (reporte) {
                res.status(200).json(reporte)
            } else {
                res.status(404).json({ error: "Reporte no encontrado" })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    updateReporte = async (req, res) => {
        try{
            const { id } = req.params
            const reporteData = req.body
            const updatedReporte = await this.service.updateReporte(id, reporteData)
            if (updatedReporte){
                res.status(200).json(updatedReporte)
            } else {
                res.status(404).json({ error: "Reporte no encontrado" })
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    deleteReporte = async (req, res) => {
        try{
            const { id } = req.params;
            const deleted = await this.service.deleteReporte(id);
            if (deleted) {
                res.status(200).json({ message: "Reporte eliminado correctamente" })
            } else {
                res.status(404).json({ error: "Reporte no encontrado" })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

export const reportesController = new ReportesController(reportesService)