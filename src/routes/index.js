import express from 'express';
import * as animalController from '../controllers/animalController.js';
import * as UsuarioController from '../controllers/usuarioController.js';
import * as QuestionarioController from '../controllers/questionarioController.js';
import * as PedidoAdocaoController from '../controllers/pedidoAdocaoController.js';
import * as DoacaoController from '../controllers/doacaoController.js';
const adminRouter = express.Router();
// Rotas admin para animais
adminRouter.get('/animais', animalController.getAll);
adminRouter.patch('/animais/:id', animalController.update);
adminRouter.delete('/animais/:id', animalController.remove);

// Rotas PATCH para animais e tutores
router.patch('/animais/:id', animalController.update);
router.patch('/tutores/:id', UsuarioController.update);

// Aliases para recursos
router.post('/tutores', UsuarioController.create);
router.get('/tutores/:id', UsuarioController.getById);
router.post('/questionário', QuestionarioController.create);
router.post('/adocoes', PedidoAdocaoController.create);
router.post('/login', UsuarioController.login);
router.post('/doacoes', DoacaoController.create);

// Adiciona adminRouter sob /admin
router.use('/admin', adminRouter);
import { Router } from 'express';


const router = Router();
// Rotas públicas
router.post('/animais', animalController.create);
router.get('/animais', animalController.getAll);
router.get('/animais/:id', animalController.getById);

router.post('/tutores', UsuarioController.create);
router.patch('/tutores/:id', UsuarioController.update);
router.get('/tutores/:id', UsuarioController.getById);

router.post('/questionário', QuestionarioController.create);
router.post('/adocoes', PedidoAdocaoController.create);

// Rotas admin
// (declarado acima)

router.post('/login', UsuarioController.login);
router.post('/doacoes', DoacaoController.create);

export default router;