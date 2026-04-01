import express from 'express';
const router = express.Router();
import * as controller from '../controller/convert.js';
import auth from '../mildware/auth.js';

router.get('/', controller.listConverts);
router.get('/:id', controller.getConvert);
router.post('/', auth, controller.createConvert);
router.put('/:id', auth, controller.updateConvert);
router.delete('/:id', auth, controller.deleteConvert);

export default router;
