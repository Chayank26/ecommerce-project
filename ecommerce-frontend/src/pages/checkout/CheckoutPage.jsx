import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { CheckoutHeader } from './CheckoutHeader.jsx'
import { OrderSummary } from './OrderSummary.jsx'
import { PaymentSummary } from './PaymentSummary.jsx'
import './CheckoutPage.css'

export function CheckoutPage({ cart,loadCart }) {
    const [deliveryOptions, setdeliveryOptions] = useState([])
    const [paymentSummary, setPaymentSummary] = useState(null)

    useEffect(() => {
        const fetchCheckoutData=async ()=>{
            let response=await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            setdeliveryOptions(response.data)
            response=await axios.get('/api/payment-summary')
            setPaymentSummary(response.data)
        }
        fetchCheckoutData()
    }, [cart])

    return (
        <>
            <title>Checkout</title>

            <CheckoutHeader cart={cart}/>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart}/>
                    <PaymentSummary paymentSummary={paymentSummary} />
                    
                </div>
            </div>
        </>
    )
}
