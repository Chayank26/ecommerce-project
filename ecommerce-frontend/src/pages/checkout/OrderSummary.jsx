import dayjs from "dayjs"
import axios from "axios"
import { DeliveryOptions } from "./DeliveryOptions"
import { useState } from "react"


export function OrderSummary({cart,deliveryOptions,loadCart}) {
    const [editingProductId,setEditingProductId]=useState(null)
    const [tempQuantity,setTempQuantity]=useState(1)
    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {

                const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
                    return deliveryOption.id === cartItem.deliveryOptionId
                })

                const isEditing = editingProductId === cartItem.productId

                const deleteCartItem = async ()=>{
                    await axios.delete(`/api/cart-items/${cartItem.productId}`)
                    await loadCart()
                }

                const startEditing=()=>{
                    setEditingProductId(cartItem.productId)
                    setTempQuantity(cartItem.quantity)
                }

                const updateCartItem =async ()=>{
                    await axios.put(`/api/cart-items/${cartItem.productId}`,{
                        quantity:tempQuantity
                    })
                    setEditingProductId(null)
                    await loadCart()
                }

                return (
                    <div key={cartItem.productId} className="cart-item-container">
                        <div className="delivery-date">
                            Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM d')}
                        </div>

                        <div className="cart-item-details-grid">
                            <img className="product-image"
                                src={cartItem.product.image} />

                            <div className="cart-item-details">
                                <div className="product-name">
                                    {cartItem.product.name}
                                </div>
                                <div className="product-price">
                                    ${(cartItem.product.priceCents / 100).toFixed(2)}
                                </div>
                                <div className="product-quantity">
                                    {isEditing ? (
                                        // 3. Render the Dropdown and Save button when in edit mode
                                        <>
                                            <select 
                                                value={tempQuantity} 
                                                onChange={(e) => setTempQuantity(Number(e.target.value))}
                                                className="quantity-select"
                                            >
                                                {[...Array(10).keys()].map((num) => (
                                                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                                                ))}
                                            </select>
                                            <span className="save-quantity-link link-primary" onClick={updateCartItem}>
                                                Save
                                            </span>
                                        </>
                                    ) : (
                                        // Render static text and Update button when in read-only mode
                                        <>
                                            <span>
                                                Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                                            </span>
                                            <span className="update-quantity-link link-primary" onClick={startEditing}>
                                                Update
                                            </span>
                                        </>
                                    )}
                                    <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                                        Delete
                                    </span>
                                </div>
                            </div>
                        <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart}/>
                        </div>
                    </div>

                )
            })}

        </div>
    )
}