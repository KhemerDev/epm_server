import express from 'express';
const router = express.Router();
import * as controller from '../controller/visitor.js';
import auth from '../mildware/auth.js';

router.get('/', controller.listVisitors);
router.get('/:id', controller.getVisitor);
router.post('/', auth, controller.createVisitor);
router.put('/:id', auth, controller.updateVisitor);
router.delete('/:id', auth, controller.deleteVisitor);

export default router;
