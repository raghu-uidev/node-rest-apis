import express, { Request, Response } from 'express';


const productRoutes = express.Router();

// product creation API
productRoutes.post('/addProduct', (req: Request, res: Response) => {

});


export default productRoutes;