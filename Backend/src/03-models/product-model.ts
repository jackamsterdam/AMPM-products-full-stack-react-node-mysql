import Joi from "joi"

class ProductModel {
  productId: number 
  categoryId: number 
  productName: string 
  fromDateTime: string  //>>>>>>>>>>>>>>>>>>??????????
  toDateTime: string  //>>>>>>>>>>>>>>>>>>??????????
  price: number 

  constructor(product: ProductModel) {
      this.productId = product.productId
      this.categoryId = product.categoryId
      this.productName = product.productName
      this.fromDateTime = product.fromDateTime
      this.toDateTime = product.toDateTime
      this.price = product.price
  }

  private static postValidationSchema = Joi.object({
      productId: Joi.forbidden(), 
      categoryId: Joi.number().required().integer().min(1),
      productName: Joi.string().required().min(2).max(100),
      fromDateTime: Joi.date().iso().required(), 
      toDateTime: Joi.date().iso().required(), 
      price: Joi.number().required().min(0).max(1000)
  })

  validatePost():string {
      const result = ProductModel.postValidationSchema.validate(this, {abortEarly: false})
      return result.error?.message
  }
}

export default ProductModel