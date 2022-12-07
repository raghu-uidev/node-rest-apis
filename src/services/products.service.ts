import productsModel from "../models/products.model"


const addProductService = async(title:string, description: string, price: number, discount: number, rating: number, stock: number, brand: string) => {
    return new Promise((resolve, reject) => {
        productsModel.addProductModel(title, description, price, discount, rating, stock, brand).then((result) => {
            resolve({messge: 'Product added successfully'});
        }).catch((error)=> {
            reject({message:'Unable to add product'});
        });
    })
}

const productsService = {
    addProductService: addProductService
}

export default productsService;