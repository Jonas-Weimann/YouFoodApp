import { Router } from 'express';
import authRouter from './auth.router.js'
import clientesRouter from './clientes.router.js'
import productosRouter from './productos.router.js'
// import pedidosRouter from './pedidos.router.js'
// import finanzasRouter from './finanzas.router.js'
// import reportesRouter from './reportes.router.js'
import rrhhRouter from './rrhh.router.js'


const router = Router()

router.use('/auth', authRouter)
router.use('/clientes', clientesRouter)
router.use('/productos', productosRouter)
// router.use('/pedidos', pedidosRouter)
// router.use('/finanzas', finanzasRouter)
// router.use('/reportes', reportesRouter)
router.use('/rrhh', rrhhRouter)

export default router