import express from 'express';
const router = express.Router();
import * as controller from '../controller/convertEvent.js';
import auth from '../mildware/auth.js';

router.get('/', controller.listConvertEvents);
router.get('/:id', controller.getConvertEvent);
router.post('/', auth, controller.createConvertEvent);
router.put('/:id', auth, controller.updateConvertEvent);
router.delete('/:id', auth, controller.deleteConvertEvent);

export default router;
