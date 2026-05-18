import { addToCart, removeFromCart, updateQuantity, toggleCart, getCart } from './cart.js';
import { showReceipt, hideReceipt, pay } from './receipt.js';

export const initializeEvents = () => {
    // Toggle cart visibility
    const cartButton = document.getElementById('cart');
    if (cartButton) {
        cartButton.addEventListener('click', toggleCart);
    }
    
    // Proceed to pay button
    const proceedPayBtn = document.getElementById('proceedPay-button');
    if (proceedPayBtn) {
        proceedPayBtn.addEventListener('click', showReceipt);
    }
    
    // Close receipt button
    const closeReceiptBtn = document.getElementById('close-receipt');
    if (closeReceiptBtn) {
        closeReceiptBtn.addEventListener('click', hideReceipt);
    }
    
    // Pay button
    const payBtn = document.getElementById('pay-button');
    if (payBtn) {
        payBtn.addEventListener('click', pay);
    }
    
    // Use event delegation on the document or main container for dynamically created elements
    document.addEventListener('click', (e) => {
        // Add to cart
        if (e.target.classList.contains('add-button')) {
            const productId = parseInt(e.target.dataset.id);
            if (!isNaN(productId)) {
                const cartContainer = document.getElementById('cart-container');
                const cart = getCart();
                const existingItem = cart.find(item => item.id === productId);
                
                if (existingItem) {
                    // If product is already in the cart, clicking "add" again closes the cart
                    if (cartContainer) cartContainer.style.display = 'none';
                } else {
                    // If product is not in the cart, add it and open the cart
                    addToCart(productId);
                    if (cartContainer) cartContainer.style.display = 'block';
                }
            }
        }
        
        // Remove from cart (close button in cart item)
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


