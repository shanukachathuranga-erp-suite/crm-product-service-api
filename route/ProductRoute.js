const express = require('express');
const ProductController = require('../controller/ProductController');

const router = express.Router();

router.post('/create-product',ProductController.createProduct);
router.get('/find-product-by-id/:id',ProductController.findProductById);
router.get('find-all-products',ProductController.findAllProducts);
router.put('/update-product/:id',ProductController.updateProduct);
router.delete('/delete-product/:id',ProductController.deleteProductById);

module.exports = router;