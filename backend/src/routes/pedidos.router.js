import { Router } from 'express';
import { pedidosController } from '../controllers/pedidos.controller.js'
import isAuthorized from '../middlewares/auth.middleware.js'

const { createPedido, getAllPedidos, getPedidosById, getPedidosByDate, updatePedido, deletePedido, updateEstadoPedido } = pedidosController

const router = Router()

router.post('/', isAuthorized, createPedido)
router.get('/', isAuthorized, getAllPedidos)
router.get('/date/', isAuthorized, getPedidosByDate)
router.get('/:id', isAuthorized, getPedidosById)
router.put('/:id', isAuthorized, updatePedido)
router.delete('/:id', isAuthorized, deletePedido)
router.patch('/:id', isAuthorized, updateEstadoPedido)

export default router