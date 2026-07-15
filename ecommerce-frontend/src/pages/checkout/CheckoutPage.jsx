import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { CheckoutHeader } from './CheckoutHeader.jsx'
import { OrderSummary } from './OrderSummary.jsx'
import { PaymentSummary } from './PaymentSummary.jsx'
import './CheckoutPage.css'

export function CheckoutPage({ cart }) {
    const [deliveryOptions, setdeliveryOptions] = useState([])
    const [paymentSummary, setPaymentSummary] = useState(null)

    useEffect(() => {
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime').then((response) => {
            setdeliveryOptions(response.data)
        })
        axios.get('/api/payment-summary').then((response) => {
            setPaymentSummary(response.data)
        })
    }, [])

    return (
        <>
            <title>Checkout</title>

            <CheckoutHeader cart={cart}/>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
                    <PaymentSummary paymentSummary={paymentSummary} />
                    
                </div>
            </div>
        </>
    )
}
