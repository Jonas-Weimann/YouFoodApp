import { Router } from "express"
import { finanzasController } from "../controllers/finanzas.controller.js"

const { getAllCompras, getAllGastos, getAllVentas, getComprasByRange, getGastosByRange, getVentasByRange, updateCompra, updateGasto, updateVenta, createCompra, createGasto, createVenta, deleteCompra, deleteGasto, deleteVenta } = finanzasController

const router = Router()

router.get('/ventas', getAllVentas)
router.get('/ventas/rango/', getVentasByRange)
router.post('/ventas', createVenta)
router.put('/ventas/:id', updateVenta)
router.delete('/ventas/:id', deleteVenta)

router.get('/gastos', getAllGastos)
router.get('/gastos/rango/', getGastosByRange)
router.post('/gastos', createGasto)
router.put('/gastos/:id', updateGasto)
router.delete('/gastos/:id', deleteGasto)

router.get('/compras', getAllCompras)
router.get('/compras/rango/', getComprasByRange)
router.post('/compras', createCompra)
router.put('/compras/:id', updateCompra)
router.delete('/compras/:id', deleteCompra)

export default router