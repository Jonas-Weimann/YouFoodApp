import { Router } from "express"
import { reportesController } from "../controllers/reportes.controller.js"
import isAuthorized from "../middlewares/auth.middleware.js"

const { getAllReportes, getReporteById, createReporte, updateReporte, deleteReporte } = reportesController

const router = Router()

router.get('/', isAuthorized, getAllReportes)
router.get('/:id', isAuthorized, getReporteById)
router.post('/', isAuthorized, createReporte)
router.put('/:id', isAuthorized, updateReporte)
router.delete('/:id', isAuthorized, deleteReporte)

export default router