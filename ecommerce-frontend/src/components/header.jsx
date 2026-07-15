import { NavLink } from 'react-router'
import './header.css'

export function Header({ cart }) {
    let totalQuantity = 0;
    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    });

    return (
        <div className="header">
            <div className="left-section">
                {/* 1. Changed class to header-link */}
                <NavLink to="/" className="header-link">
                    <img className="logo" src="images/logo-white.png" alt="Logo" />
                    <img className="mobile-logo" src="images/mobile-logo-white.png" alt="Mobile Logo" />
                </NavLink>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search" />
                <button className="search-button">
                    <img className="search-icon" src="images/icons/search-icon.png" alt="Search" />
                </button>
            </div>

            <div className="right-section">
                {/* 2. Changed classes to orders-link and header-link */}
                <NavLink className="orders-link header-link" to="/orders">
                    <span className="orders-text">Orders</span>
                </NavLink>

                {/* 3. Changed classes to cart-link header-link */}
                <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src="images/icons/cart-icon.png" alt="Cart" />
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
            </div>
        </div>
    )
}