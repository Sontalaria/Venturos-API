import { Router } from 'express';
import * as DoacaoController from '../controllers/doacaoController.js';

const router = Router();

router.get('/', DoacaoController.getAll);
router.get('/:id', DoacaoController.getById);
router.post('/', DoacaoController.create);
router.put('/:id', DoacaoController.update);
router.delete('/:id', DoacaoController.remove);

export default router;
