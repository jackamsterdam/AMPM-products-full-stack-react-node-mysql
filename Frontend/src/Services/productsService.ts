import CategoryModel from "../Models/CategoryModel"
import axios from 'axios'
import config from "../Utils/Config"
import ProductModel from "../Models/ProductModel"

class ProductsService {


async getAllCategories():Promise<CategoryModel[]> {
    const response = await axios.get<CategoryModel[]>(config.categoriesUrl)
    const categories = response.data 
    return categories
}

async getProductsByCategoryId(categoryId: number): Promise<ProductModel[]> {
    const response = await axios.get<ProductModel[]>(config.productsByCategoryId + categoryId)
    const productsByCategory = response.data 
    return productsByCategory
}

async addProduct(product: ProductModel):Promise<ProductModel>{
    const response = await axios.post<ProductModel>(config.productsUrl, product)
    const addedProduct = response.data   
    return addedProduct
}

async deleteProduct(productId: number):Promise<void> {
    await axios.delete(config.productsUrl + productId)
}



}

const productsService = new ProductsService() 

export default productsService