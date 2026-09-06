import { Product } from "./Product"
import { useState } from "react"

export function ProductsGrid({products,loadCart}) {
    
    return (
        <div className="products-grid">
            {products.map((product) => {
                return (
                    
                    <Product key={product.id} loadCart={loadCart} product={product} />
                )
            })}
        </div>
    )
}