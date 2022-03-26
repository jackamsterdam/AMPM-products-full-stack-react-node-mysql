class Config {

}

// dont forget / at end 
class DevelopmentConfig extends Config {
    categoriesUrl = 'http://localhost:3001/api/categories/'
    productsByCategoryId = 'http://localhost:3001/api/products-by-categoryId/'  //:categoryId
    productsUrl = "http://localhost:3001/api/products/";   //with delete we add //:productId
}

class ProductionConfig extends Config {
    categoriesUrl = 'http://localhost:3001/api/categories/'
    productsByCategoryId = 'http://localhost:3001/api/products-by-categoryId/'  //:categoryId
    productsUrl = "http://localhost:3001/api/products/";   //with delete we add //:productId
}

const config = process.env.NODE_ENV === 'production' ? new ProductionConfig() : new DevelopmentConfig()

export default config