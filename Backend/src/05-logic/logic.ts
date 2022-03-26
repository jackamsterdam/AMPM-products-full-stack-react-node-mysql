import { OkPacket } from "mysql";
import dal from "../04-dal/dal";
import ErrorModel from "../03-models/error-model";
import CategoryModel from "../03-models/category-model";
import ProductModel from "../03-models/product-model";



async function getAllCategories():Promise<CategoryModel[]>{
  const sql = `SELECT *
               FROM categories`

  const categories = await dal.execute(sql)
  return categories

}

async function getProductsByCategoryId(categoryId: number):Promise<ProductModel[]> {
   const sql = `SELECT *
                FROM products 
                WHERE categoryId = ?
                ORDER BY price`

    const products = await dal.execute(sql, [categoryId])

    if (!products.length) throw new ErrorModel(404, `Resources with id ${categoryId} not found`)

    return products
}

async function addProduct(product: ProductModel):Promise<ProductModel> {
    console.log(product)
  const errors = product.validatePost()
  if (errors) throw new ErrorModel(400, errors)

  const sql = `INSERT INTO products VALUES(DEFAULT, ?,?,?,?,?)`

  const info: OkPacket = await dal.execute(sql, [product.categoryId,product.productName,product.fromDateTime,product.toDateTime,product.price])

  product.productId = info.insertId
  console.log(product)
  return product 
}

async function deleteProduct(productId: number):Promise<void> {
  const sql = `DELETE FROM products 
               WHERE productId = ?`

               const info: OkPacket = await dal.execute(sql, [productId])
               if (info.affectedRows === 0) throw new ErrorModel(404, `Resource with id ${productId} not found.`)
}

export default {
getAllCategories,
getProductsByCategoryId,
addProduct,
deleteProduct
}