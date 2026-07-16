import dayjs from "dayjs"
import axios from "axios"
import { Fragment, useState } from "react" // 1. Imported useState
import { Link } from "react-router"

export function OrdersGrid({ orders, loadCart }) {
    // 2. State to track which item was just clicked to show the "Added" message
    const [addedItemId, setAddedItemId] = useState(null)

    // 3. Updated function to accept target productId dynamically
    const addToCart = async (productId) => {
        await axios.post('/api/cart-items', {
            productId: productId,
            quantity: 1 // Default Buy Again quantity to 1
        })
        await loadCart()

        // 4. Trigger "Added" pop-up for 2 seconds
        setAddedItemId(productId)
        setTimeout(() => {
            setAddedItemId(null)
        }, 2000)
    }

    return (
        <div className="orders-grid">
            {orders.map((order) => {
                return (
                    <div key={order.id} className="order-container">

                        <div className="order-header">
                            <div className="order-header-left-section">
                                <div className="order-date">
                                    <div className="order-header-label">Order Placed:</div>
                                    <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                                </div>
                                <div className="order-total">
                                    <div className="order-header-label">Total:</div>
                                    <div>${(order.totalCostCents / 100).toFixed(2)}</div>
                                </div>
                            </div>

                            <div className="order-header-right-section">
                                <div className="order-header-label">Order ID:</div>
                                <div>{order.id}</div>
                            </div>
                        </div>

                        <div className="order-details-grid">
                            {order.products.map((orderProduct) => {
                                const isAdded = addedItemId === orderProduct.product.id;

                                return (
                                    <Fragment key={orderProduct.product.id}>

                                        <div className="product-image-container">
                                            <img src={orderProduct.product.image} alt={orderProduct.product.name} />
                                        </div>

                                        <div className="product-details">
                                            <div className="product-name">
                                                {orderProduct.product.name}
                                            </div>
                                            {/* Fixed: changed lowercase 'd' to uppercase 'D' */}
                                            <div className="product-delivery-date">
                                                Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                                            </div>
                                            <div className="product-quantity">
                                                Quantity: {orderProduct.quantity}
                                            </div>

                                            {/* 5. Trigger click actions on the button, passing the correct ID */}
                                            <button
                                                className="buy-again-button button-primary"
                                                onClick={() => addToCart(orderProduct.product.id)}
                                            >
                                                <img className="buy-again-icon" src="images/icons/buy-again.png" alt="" />
                                                <span className="buy-again-message">
                                                    {isAdded ? "Added!" : "Add to Cart"}
                                                </span>
                                            </button>
                                        </div>

                                        <div className="product-actions">
                                            <Link to={`/tracking/${order.id}/${orderProduct.product.id}`}>
                                                <button className="track-package-button button-secondary">
                                                    Track package
                                                </button>
                                            </Link>
                                        </div>
                                    </Fragment>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}