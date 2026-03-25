import { Router } from 'express';
import { pedidosController } from '../controllers/pedidos.controller.js'
import isAuthorized from '../middlewares/auth.middleware.js'

const { createPedido, getAllPedidos, getPedidosById, getPedidosByDate, getPedidosByRange, updatePedido, deletePedido, updateEstadoPedido } = pedidosController

const router = Router()

router.post('/', isAuthorized, createPedido)
router.get('/', isAuthorized, getAllPedidos)
router.get('/fecha/', isAuthorized, getPedidosByDate)
router.get('/rango/', isAuthorized, getPedidosByRange)
router.get('/:id', isAuthorized, getPedidosById)
router.put('/:id', isAuthorized, updatePedido)
router.delete('/:id', isAuthorized, deletePedido)
router.patch('/:id', isAuthorized, updateEstadoPedido)

export default router