import { Router } from 'express';
import * as QuestionarioController from '../controllers/questionarioController.js';

const router = Router();

router.get('/', QuestionarioController.getAll);
router.get('/:id', QuestionarioController.getById);
router.post('/', QuestionarioController.create);
router.put('/:id', QuestionarioController.update);
router.delete('/:id', QuestionarioController.remove);

export default router;