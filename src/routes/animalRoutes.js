import express from 'express';
import * as animalController from '../controllers/animalController.js';


const router = express.Router();

router.get('/', animalController.getAll);
router.get('/:id', animalController.getById);
router.post('/', animalController.create);
router.put('/:id', animalController.update);
router.delete('/:id', animalController.remove);


export default router;