import { Router } from 'express';
import { productosController } from '../controllers/productos.controller.js'
import isAuthorized from '../middlewares/auth.middleware.js';

const { getAllProductos, getProductoById, getProductosByCategoria, createProducto, updateProducto, deleteProducto } = productosController

const router = Router()

router.get('/', getAllProductos)
router.get('/:id', getProductoById)
router.get('/cat/:categoria', getProductosByCategoria)
router.post('/', isAuthorized, createProducto)
router.put('/:id', isAuthorized, updateProducto)
router.delete('/:id', isAuthorized, deleteProducto)

export default router