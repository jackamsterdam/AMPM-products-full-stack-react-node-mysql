import "./Addproduct.css";
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import CategoryModel from "../../../Models/CategoryModel";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/productsService";
import { useState, useEffect } from 'react'
import notify from "../../../Services/NotifyService";

function Addproduct(): JSX.Element {


    const { register, handleSubmit, formState } = useForm<ProductModel>()
    const navigate = useNavigate()

    const [categories, setCategories] = useState<CategoryModel[]>([])

    useEffect(() => {
        (async function () {
            try {
                const categories = await productsService.getAllCategories()
                setCategories(categories)
            } catch (err: any) {
                notify.error(err)
            }
        })()
    }, [])

    async function submit(product: ProductModel) {
        console.log('product', product)

        try {
            await productsService.addProduct(product)
            notify.success('Product has been added')
            navigate('/products-list')
        } catch (err: any) {
            notify.error(err)   
        }

    }





    return (
        <div className="Addproduct Box">
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit(submit)}>

                <label>Choose Category</label>
                <select defaultValue="" {...register('categoryId', {
                    required: { value: true, message: "Missing category" }
                })}>
                    <option disabled value="">Choose Category</option>
                    {categories.map(c => <option key={c.categoryId} value={c.categoryId}>{c.name}</option>)}
                </select>
                <span>{formState.errors?.categoryId?.message}</span>
<br />
                <label>Product Name:</label>
                <input type="text" {...register('productName', {
                    required: { value: true, message: 'Missing product name.' }
                })} />
                <span>{formState.errors?.productName?.message}</span>

                <label>Manufacturer Date:</label>
                <input type="datetime-local" {...register('fromDateTime', {
                    required: { value: true, message: 'Missing manufacturer date' }
                })} />
                <span>{formState.errors?.fromDateTime?.message}</span>

                <label>Expiration Date:</label>
                <input type="datetime-local" {...register('toDateTime', {
                    required: { value: true, message: 'Missing Expiry date' }
                })} />
                <span>{formState.errors?.toDateTime?.message}</span>

                <label>Price:</label>
                <input type="number" step="0.01" {...register('price', {
                    required: { value: true, message: 'Missing price' },
                    min: { value: 0, message: "Price can't be negative" },
                    max: { value: 1000, message: "Price can't exceed 1000." }
                })} />
                <span>{formState.errors?.price?.message}</span>



                <button>Add</button>

            </form>

        </div>
    );
}

export default Addproduct;
