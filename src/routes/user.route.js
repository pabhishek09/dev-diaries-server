import express from 'express';
import UserController from '../controllers/user.controller';

const router = express.Router();

router.get('/:id', UserController.findUser);
router.put('/:id/updateUserScore', UserController.updateUserScore);
export default router;
