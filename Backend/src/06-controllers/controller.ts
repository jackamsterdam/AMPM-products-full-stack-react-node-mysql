import express, { NextFunction, Request, Response } from 'express'
import ProductModel from '../03-models/product-model'
import logic from '../05-logic/logic'

const router = express.Router()

router.get('/categories', async (request: Request, response: Response, next: NextFunction) => {
  try {
        const categories = await logic.getAllCategories()
        response.json(categories)

  } catch (err: any) {
      next(err)
  }
})

router.get('/products-by-categoryId/:categoryId', async (request: Request, response: Response, next: NextFunction) => {
  try {
        const categoryId = +request.params.categoryId
        const products = await logic.getProductsByCategoryId(categoryId)
        response.json(products)

  } catch (err: any) {
      next(err)
  }
})

router.post('/products', async (request: Request, response: Response, next: NextFunction) => {
  try {
        const product = new ProductModel(request.body)
        const addedProduct = await logic.addProduct(product)
        response.status(201).json(addedProduct)

  } catch (err: any) {
      next(err)
  }
})

router.delete('/products/:productId', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const productId = +request.params.productId
    await logic.deleteProduct(productId)
    response.sendStatus(204)

  } catch (err: any) {
      next(err)
  }
})



export default router 