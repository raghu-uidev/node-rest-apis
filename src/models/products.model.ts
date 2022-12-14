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

const addProductImagesModel = async (productId:number, imgSrc: string) => {
   const query = `insert into product_images (product_id, img_src) 
   values(${productId}, "${imgSrc}")`;
   //console.log(query);
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

const getAllProductsModel = async (productId: string) => {
   let whereClause = '';
   if(productId){
      whereClause = `and p.id=${productId}`;
   }
   const query = `SELECT p.id,p.title,
   p.description,p.price,p.rating,p.discount,p.stock,p.brand,
   GROUP_CONCAT(i.img_src SEPARATOR '|') AS images
   FROM products  AS p, 
   product_images AS i
   WHERE FIND_IN_SET(i.product_id, p.id) != 0 and p.status='A' ${whereClause}  GROUP BY p.id;`;
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

const deleteProductModel = async (productId: number) => {
   const deleteQry = `update  products  set status='I' where id=${productId}`;
   return new Promise((resolve, reject) => {
      Connect().then((connection) => {
        Query(connection, deleteQry).then((result) => {
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
    addProductModel: addProductModel,
    addProductImagesModel: addProductImagesModel,
    getAllProductsModel: getAllProductsModel,
    deleteProductModel: deleteProductModel
}

export default productsModel;