import { Connect, Query } from "../configs/mysql";

const addProductModel = async (title:string, description: string, price: number, discount: number, rating: number, stock: number, brand: string) => {
   const query = `insert into products (title, description, price, discount, rating, stock, brand) 
   values("${title}", "${description}", ${price}, ${discount}, ${rating}, ${stock}, "${brand}")`;
   console.log(query);
   return new Promise((resolve, reject) => {
      Connect().then((connection) => {
        Query(connection, query).then((result) => {
          resolve(result);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
      }).catch((error) => {
         reject(error);
      })
   });
}

const productsModel = {
    addProductModel: addProductModel
}

export default productsModel;