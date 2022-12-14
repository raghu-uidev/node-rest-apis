import express from "express";
import cartController from "../controllers/cart.controller";
import authJWT from "../middleware/auth";

const cartRoutes = express.Router();

// Add product to cart
cartRoutes.post('/addToCart/:cartId', authJWT.verifyToken, cartController.addProductToCartController);

export default cartRoutes; 