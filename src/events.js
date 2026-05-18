import { addToCart, removeFromCart, updateQuantity, toggleCart } from './cart.js';

export const initializeEvents = () => {
    // Toggle cart visibility
    const cartButton = document.getElementById('cart');
    if (cartButton) {
        cartButton.addEventListener('click', toggleCart);
    }
    
    // Use event delegation on the document or main container for dynamically created elements
    document.addEventListener('click', (e) => {
        // Add to cart
        if (e.target.classList.contains('add-button')) {
            const productId = parseInt(e.target.dataset.id);
            if (!isNaN(productId)) {
                addToCart(productId);
            }
        }
        
        // Remove from cart (close button in cart item)
        // Check if the click is on the button itself or the image inside it
        const closeBtn = e.target.closest('.close-button');
        if (closeBtn && closeBtn.closest('.cart-container')) {
            const productId = parseInt(closeBtn.dataset.id);
            if (!isNaN(productId)) {
                removeFromCart(productId);
            }
        }
        
        // Increase quantity
        if (e.target.classList.contains('increase-qty')) {
            const productId = parseInt(e.target.dataset.id);
            if (!isNaN(productId)) {
                updateQuantity(productId, 1);
            }
        }
        
        // Decrease quantity
        if (e.target.classList.contains('decrease-qty')) {
            const productId = parseInt(e.target.dataset.id);
            if (!isNaN(productId)) {
                updateQuantity(productId, -1);
            }
        }
    });
};


