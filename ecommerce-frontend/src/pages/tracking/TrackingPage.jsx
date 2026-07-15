import axios from 'axios'
import dayjs from 'dayjs'
import { Header } from '../../components/header'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import './TrackingPage.css'


export function TrackingPage({cart}) {
    const {orderId,productId}=useParams()
    const [order,setOrder]=useState(null)
    useEffect(()=>{
        const fetchTrackingData=async ()=>{
            const response=await axios.get(`/api/orders/${orderId}?expand=products`)
            setOrder(response.data)
            
        }
        fetchTrackingData()
    },[orderId])
    if(!order) return null

    const trackingProduct = order.products.find((item) => item.productId === productId)
    const totalDeliveryTimeMs=trackingProduct.estimatedDeliveryTimeMs-order.orderTimeMs
    const timePassedMs=dayjs().valueOf()-order.orderTimeMs
    let deliveryProgress=(timePassedMs/totalDeliveryTimeMs)*100
    if(deliveryProgress>100) deliveryProgress=100
    
    let isPreparing=false
    let isShipped=false
    let isDelivered=false
    if(deliveryProgress<33){
        isPreparing=true
    }else if(deliveryProgress>=33 && deliveryProgress<100){
        isShipped=true
    }else{
        isDelivered=true
    }
    return (
        <>
            <Header cart={cart}/>

            <div className="tracking-page">
                <div className="order-tracking">
                    <a className="back-to-orders-link link-primary" href="/orders">
                        View all orders
                    </a>

                    <div className="delivery-date">
                        {(deliveryProgress>=100)?(
                            <>Delivered on {dayjs(trackingProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}</>
                        ):(
                            <>Arriving on {dayjs(trackingProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}</>
                        )}
                    </div>

                    <div className="product-info">
                        {trackingProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {trackingProduct.quantity}
                    </div>

                    <img className="product-image" src={`${trackingProduct.product.image}`} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${isPreparing && 'current-status'}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${isShipped && 'current-status'}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${isDelivered && 'current-status'}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{width:`${deliveryProgress}%`}}></div>
                    </div>
                </div>
            </div>
        </>
    )
}