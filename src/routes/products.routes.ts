import express, { Request, Response } from 'express';
import productController from '../controllers/products.controller';
import authJWT from '../middleware/auth';


const productRoutes = express.Router();

// product creation API
productRoutes.post('/addProduct', authJWT.verifyToken, productController.addProductController);

// get all products API
productRoutes.get('/getProducts',  productController.getProductsController);

// get specific product API
productRoutes.get('/getProduct/:id', productController.getProductsController);

// delete a product API
productRoutes.delete('/deleteProduct/:id', authJWT.verifyToken, productController.deleteProductController);


export default productRoutes;


