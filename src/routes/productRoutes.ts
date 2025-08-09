import { Router } from 'express';
import ProductController from '../controllers/product';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const productController = new ProductController();

router.post('/products', authenticateToken, productController.createProduct.bind(productController));
router.put('/products/:id', authenticateToken, productController.editProduct.bind(productController));
router.get('/products', authenticateToken, productController.getAllProducts.bind(productController));

export default router;