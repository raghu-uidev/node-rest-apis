import express, { Request, Response } from 'express';
import productController from '../controllers/products.controller';


const productRoutes = express.Router();

// product creation API
productRoutes.post('/addProduct', productController.addProductController);

// add products from external API
productRoutes.get('/addDummyProducts', productController.addDummyProductController);

export default productRoutes;