import express, { Request, Response } from "express";
import productRoutes from "./routes/products.routes";
import usersRoutes from "./routes/users.routes";
const app = express();
const API_VERSION =  '/api/v1';
app.use(express.json());
app.use(API_VERSION + '/users', usersRoutes);
app.use(API_VERSION + '/products', productRoutes);

app.listen(4000, () => {
  console.log('Application is running at http://localhost:4000');
});