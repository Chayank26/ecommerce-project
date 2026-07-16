import axios from 'axios'
import { useState, useEffect} from 'react'
import { Header } from '../../components/header'
import { OrdersGrid } from './OrdersGrid'
import './OrdersPage.css'
import { products } from '../../../starting-code/data/products'

export function OrdersPage({ cart,loadCart }) {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrdersData=async ()=>{
            const response=await axios.get('/api/orders?expand=products')
            setOrders(response.data)
        }
        fetchOrdersData()
    }, [])
    return (
        <>
            <title>Orders</title>

            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrdersGrid orders={orders} loadCart={loadCart} />
            </div>
        </>
    )
}