import { Router } from 'express';
import { rrhhController } from '../controllers/rrhh.controller.js'
import isAuthorized from '../middlewares/auth.middleware.js';

const { createEmpleado, getAllEmpleados, getEmpleadoById, getEmpleadoBySector, updateEmpleado, deleteEmpleado } = rrhhController

const router = Router();

router.post('/', isAuthorized, createEmpleado);
router.get('/', isAuthorized, getAllEmpleados);
router.get('/:id', isAuthorized, getEmpleadoById);
router.get('/sec/:sector', isAuthorized, getEmpleadoBySector);
router.put('/:id', isAuthorized, updateEmpleado);
router.delete('/:id', isAuthorized, deleteEmpleado);

export default router;