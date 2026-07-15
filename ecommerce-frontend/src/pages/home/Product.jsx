import axios from "axios"
import { useState } from "react"

export function Product({ product, loadCart }) {
    const [quantity, setQuantity] = useState(1)
    // 1. Added visibility state at the top level
    const [isAdded, setIsAdded] = useState(false)

    const addToCart = async () => {
        await axios.post('/api/cart-items', {
            productId: product.id,
            quantity: quantity
        })
        await loadCart()
    }

    const selectQuantity = (event) => {
        const quantitySelected = Number(event.target.value)
        setQuantity(quantitySelected)
    }

    // 2. Fixed: Normal helper function to manage the "Added" timing state
    const triggerAddedMessage = () => {
        setIsAdded(true) // Show message instantly

        setTimeout(() => {
            setIsAdded(false) // Hide message after 2 seconds
        }, 2000)
    }

    return (
        <div className="product-container">
            <div className="product-image-container">
                <img className="product-image" src={product.image} alt={product.name} />
            </div>

            <div className="product-name limit-text-to-2-lines">
                {product.name}
            </div>

            <div className="product-rating-container">
                <img
                    className="product-rating-stars"
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`}
                    alt={`${product.rating.stars} stars`}
                />
                <div className="product-rating-count link-primary">
                    {product.rating.count}
                </div>
            </div>

            <div className="product-price">
                ${(product.priceCents / 100).toFixed(2)}
            </div>

            <div className="product-quantity-container">
                <select value={quantity} onChange={selectQuantity}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div className="product-spacer"></div>

            {/* 3. Handled dynamic visibility cleanly using inline ternary class switches */}
            <div className={`added-to-cart ${isAdded ? 'show-message' : 'hide-message'}`}>
                <img src="images/icons/checkmark.png" alt="Checkmark" />
                Added
            </div>

            {/* 4. Triggers both the database API post updates and visual popup states simultaneously */}
            <button className="add-to-cart-button button-primary" onClick={() => {
                triggerAddedMessage()
                addToCart()
            }}>
                Add to Cart
            </button>
        </div>
    )
}