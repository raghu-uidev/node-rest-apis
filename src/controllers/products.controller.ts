import { Request, Response } from "express";
import productsService from "../services/products.service";
import fetch from 'node-fetch';

const addProductController = async (req: Request, res: Response) => {
    const {title, description, price, discount, rating, stock, brand} = req.body;
    if(!title) {
        return res.status(400).send({message: 'Product title not found'});
        
     } 
     if(!description) {
         return res.status(400).send({message: 'Product description not found'});
        
     } 
     if(!price) {
         return res.status(400).send({message: 'Product price not found'}); 
     }

     productsService.addProductService(title, description, price, discount, rating, stock, brand).then((result) => {
        return res.status(200).send(result);
     }).catch((error) => {
        return res.status(500).send(error);
     })
}

/**Call only one time */

const addDummyProductController = async (req: Request, res: Response) => {
    const ar = [1,2,3,4,5];
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    data.products.forEach((product: any, index: number) => {
        const {id, images} = product;
        console.log('productId:' + id);
        if(data.products.length-1 === index) {
            return res.status(200).send({message: 'All product images inserted successfully'});
        } else {
            images.forEach((imageSrc: string) => {
             productsService.addProductImagesService(id,imageSrc).then((result) => {
               console.log('inserted image for product:'+ id)
             }).catch((error) => {
                return res.status(500).send({message: 'Unable to insert products'});
             })
            });
        }
        
    });
}

const getProductsController = async (req: Request, res: Response) => {
     const productId = req.params.id;
     productsService.getProductsService(productId).then((result) => {
       return res.status(200).send(result);
     }).catch((error) => {
        return res.status(500).send(error);
     });
}

const deleteProductController =async (req: Request, res: Response) => {
    const productId = Number(req.params.id);
    productsService.deleteProductService(productId).then((result) => {
        return res.status(200).send({message: 'Product deleted successfully.'});
      }).catch((error) => {
         return res.status(500).send({message: 'Unable to deleted product.'});
    })
}

const productController = {
    addProductController: addProductController,
    addDummyProductController: addDummyProductController,
    getProductsController: getProductsController,
    deleteProductController: deleteProductController
}

export default productController;