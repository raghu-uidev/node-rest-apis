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

const addProductImagesService = async (productId:number, imgSrc:string) => {
    return new Promise((resolve, reject) => {
        productsModel.addProductImagesModel(productId, imgSrc).then((result) => {
            resolve(true);
        }).catch((error)=> {
            reject(false);
        });
    });
}

const getProductsService = async (productId: string) => {
    return new Promise((resolve, reject) => {
        productsModel.getAllProductsModel(productId).then((result: any) => {
            result.forEach((item: any) => {
                item.images = item.images.split('|');
            });
            resolve({products: result});
        }).catch((error)=> {
            reject({message: 'Unable to get the products'});
        });
    });
}

const deleteProductService =async (productId: number) => {
    return new Promise((resolve, reject) => {
        productsModel.deleteProductModel(productId).then((result: any) => {
           resolve(result);
        }).catch((error)=> {
            reject(error);
        });
    });
}

const productsService = {
    addProductService: addProductService,
    addProductImagesService: addProductImagesService,
    getProductsService: getProductsService,
    deleteProductService: deleteProductService
}

export default productsService;