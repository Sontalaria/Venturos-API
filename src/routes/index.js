import { Router } from 'express';

import animalRoutes from './animalRoutes.js';
import usuarioRoutes from './usuarioRoutes.js';
import questionarioRoutes from './questionarioRoutes.js';
import pedidoAdocaoRoutes from './pedidoAdocaoRoutes.js';
import doacaoRoutes from './doacaoRoutes.js';

const router = Router();

router.use('/animais', animalRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/questionarios', questionarioRoutes);
router.use('/pedidos-adocao', pedidoAdocaoRoutes);
router.use('/doacoes', doacaoRoutes);

export default router;