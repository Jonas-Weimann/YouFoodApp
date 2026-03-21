import { Router } from 'express'
import { clientesController } from '../controllers/clientes.controller.js'
import isAuthorized from '../middlewares/auth.middleware.js'

const { getAllClientes, getClienteById, createCliente, updateCliente, deleteCliente } = clientesController

const router = Router()

router.get('/', isAuthorized, getAllClientes)
router.get('/:id', isAuthorized, getClienteById)
router.post('/', isAuthorized, createCliente)
router.put('/:id', isAuthorized, updateCliente)
router.delete('/:id', isAuthorized, deleteCliente)


export default router