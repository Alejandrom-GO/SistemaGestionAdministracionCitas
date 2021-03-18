import { checkRole } from './../middlewares/rol';
import { checkJwt } from './../middlewares/jwt';

import { Router } from 'express';
import DatesController from '../controller/DatesController';

const router = Router();

//ver todas las citas
router.get('/dates-all', [checkJwt, checkRole(['admin', 'user', 'adminArea'])],  DatesController.getAll);

//crear cita
router.post('/', [checkJwt, checkRole(['admin', 'user','adminArea'])],  DatesController.newDate);

//buscarCita
router.get('/:id', [checkJwt, checkRole(['admin', 'user', 'adminArea'])], DatesController.getById);

//editarcitas
router.put('/:id', [checkJwt, checkRole(['admin','adminArea'])], DatesController.edit);

//borrarCitas
router.delete('/:id', [checkJwt, checkRole(['admin', 'user', 'adminArea'])], DatesController.delete);

export default router;
