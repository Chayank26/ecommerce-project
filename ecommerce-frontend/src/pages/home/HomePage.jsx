import axios from 'axios'
import { useEffect, useState } from 'react'
import { Header } from '../../components/header'
import { ProductsGrid } from './ProductsGrid'
import './HomePage.css'
import '../../components/header.css'

export function HomePage({ cart,loadCart }) {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const getHomeData=async ()=>{
            const response=await axios.get('/api/products')
            setProducts(response.data) //gets all the products to be displayed on the home page from the backend
        }
        getHomeData()
    }, [])

    return (
        <>
            <title>Ecommerce Project</title>
            <Header cart={cart} />
            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart}/>
            </div>
        </>

    )
}