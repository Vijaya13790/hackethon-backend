import { Router } from 'express';
import IndexController from '../controllers/index';

const router = Router();
const indexController = new IndexController();

router.get('/', indexController.getIndex.bind(indexController));
router.post('/register', indexController.register.bind(indexController));
router.post('/login', indexController.login.bind(indexController));

export default router;