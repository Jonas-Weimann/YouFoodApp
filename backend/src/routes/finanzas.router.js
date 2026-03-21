import { Router } from "express"
import { finanzasController } from "../controllers/finanzas.controller.js"
import isAuthorized from "../middlewares/auth.middleware.js"

const { getAllCompras, getAllGastos, getAllVentas, getComprasByRange, getGastosByRange, getVentasByRange, updateCompra, updateGasto, updateVenta, createCompra, createGasto, createVenta, deleteCompra, deleteGasto, deleteVenta } = finanzasController

const router = Router()

router.get('/ventas', isAuthorized, getAllVentas)
router.get('/ventas/rango/', isAuthorized, getVentasByRange)
router.post('/ventas',isAuthorized, createVenta)
router.put('/ventas/:id',isAuthorized, updateVenta)
router.delete('/ventas/:id',isAuthorized, deleteVenta)

router.get('/gastos',isAuthorized, getAllGastos)
router.get('/gastos/rango/',isAuthorized, getGastosByRange)
router.post('/gastos',isAuthorized, createGasto)
router.put('/gastos/:id',isAuthorized, updateGasto)
router.delete('/gastos/:id',isAuthorized, deleteGasto)

router.get('/compras',isAuthorized, getAllCompras)
router.get('/compras/rango/',isAuthorized, getComprasByRange)
router.post('/compras',isAuthorized, createCompra)
router.put('/compras/:id',isAuthorized, updateCompra)
router.delete('/compras/:id',isAuthorized, deleteCompra)

export default router