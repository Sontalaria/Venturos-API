import { Router } from 'express';
import * as UsuarioController from '../controllers/usuarioController.js';

const router = Router();

router.post('/login-admin', UsuarioController.loginAdmin);
router.post('/login', UsuarioController.login);
router.get('/', UsuarioController.getAll);
router.get('/:id', UsuarioController.getById);
router.post('/', UsuarioController.create);
router.put('/:id', UsuarioController.update);
router.delete('/:id', UsuarioController.remove);

export default router;