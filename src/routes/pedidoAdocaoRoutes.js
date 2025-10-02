import { Router } from 'express';
import * as PedidoAdocaoController from '../controllers/pedidoAdocaoController.js';

const router = Router();

router.get('/', PedidoAdocaoController.getAll);
router.get('/:id', PedidoAdocaoController.getById);
router.post('/', PedidoAdocaoController.create);
router.put('/:id', PedidoAdocaoController.update);
router.delete('/:id', PedidoAdocaoController.remove);

export default router;
