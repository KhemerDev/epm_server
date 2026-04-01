import express from 'express';
const router = express.Router();
import * as controller from '../controller/member.js';
import auth from '../mildware/auth.js';

router.get('/', controller.listMembers);
router.get('/:id', controller.getMember);
router.post('/', auth, controller.createMember);
router.put('/:id', auth, controller.updateMember);
router.delete('/:id', auth, controller.deleteMember);

export default router;
