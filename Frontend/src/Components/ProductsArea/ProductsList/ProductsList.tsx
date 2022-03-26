import { SyntheticEvent, useEffect, useState, RefObject, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CategoryModel from "../../../Models/CategoryModel";
import ProductModel from "../../../Models/ProductModel";
import notify from "../../../Services/NotifyService";
import productsService from "../../../Services/productsService";
import Loading from "../../SharedArea/Loading/Loading";
import "./ProductsList.css";

function ProductsList(): JSX.Element {

    const [categories, setCategories] = useState<CategoryModel[]>([])
    const [products, setProducts] = useState<ProductModel[]>([])
    const selectBoxRef: RefObject<HTMLSelectElement> = useRef<HTMLSelectElement>()


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

    async function handleChange(e: SyntheticEvent) {
        try {
            const value = +(e.target as HTMLSelectElement).value
            const productsByCategory = await productsService.getProductsByCategoryId(value)
            setProducts(productsByCategory)
        } catch (err: any) {
            notify.error(err)
        }

    }

    async function deleteProduct(productId: number): Promise<void> {

        try {
            await productsService.deleteProduct(productId)
            console.log(selectBoxRef.current.value)
            notify.success('Product has been deleted')

            const productsByCategory = await productsService.getProductsByCategoryId(+selectBoxRef.current.value)
            setProducts(productsByCategory)
        }

        catch (err: any) {
            notify.error(err);
        }



    }
function formatDateTime(dateTime: string):string {
    const d = new Date(dateTime)
    return d.toLocaleString()
}


    return (

        // {!products.length && <Loading/>}


        <div className="ProductsList">
            <select onChange={handleChange} defaultValue='' ref={selectBoxRef}>
                <option disabled value="">Choose a Category</option>
                {categories.map(c => <option value={c.categoryId} key={c.categoryId}>{c.name}</option>)}
            </select>

            {(products.length !== 0) &&
                <table>

                    <thead>
                        <tr>
                            <th>Product Name:</th>
                            <th>Date and Tme of Manufacturer</th>
                            <th>Expiration Date</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => <tr key={p.productId}>
                            <td>{p.productName}</td>
                            <td>{formatDateTime(p.fromDateTime)}</td>
                            <td>{formatDateTime(p.toDateTime)}</td>
                            <td>{p.price}</td>
                            <td><button onClick={() => deleteProduct(p.productId)}>Delete</button></td>
                        </tr>)}
                    </tbody>
                </table>}

            
        </div>
    );
}

export default ProductsList;
