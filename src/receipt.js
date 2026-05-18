import { getCart, calculateTotal, renderCart } from './cart.js';

export const showReceipt = () => {
    const cart = getCart();
    if (cart.length === 0) return; // Don't show receipt if cart is empty
    
    const productsContainer = document.getElementById('products-container');
    const receiptContainer = document.getElementById('receipt-container');
    const receiptProductContainer = document.getElementById('receipt-product');
    const receiptTotal = document.getElementById('receipt-total');
    
    if (productsContainer && receiptContainer && receiptProductContainer) {
        // Hide cart products, show receipt
        productsContainer.style.display = 'none';
        receiptContainer.style.display = 'flex';
        
        // Clear previous receipt content
        receiptProductContainer.innerHTML = '';
        
        // Remove class from container so it doesn't get styled like a single item
        receiptProductContainer.classList.remove('receipt-product');
        receiptProductContainer.style.width = '100%';
        
        // Render each item
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'receipt-product';
            itemDiv.innerHTML = `
                <h3>${item.name}</h3>
                <div class="receipt-price">
                    <p>Cantidad: ${item.quantity}</p>
                    <h5>${(item.price * item.quantity).toFixed(2)} €</h5>
                </div>
            `;
            receiptProductContainer.appendChild(itemDiv);
        });
        
        // Update total
        if (receiptTotal) {
            receiptTotal.textContent = `Total: ${calculateTotal().toFixed(2)} €`;
        }
    }
};

export const hideReceipt = () => {
    const productsContainer = document.getElementById('products-container');
    const receiptContainer = document.getElementById('receipt-container');
    
    if (productsContainer && receiptContainer) {
        receiptContainer.style.display = 'none';
        productsContainer.style.display = 'flex';
    }
};

export const pay = () => {
    import('./cart.js').then(({ clearCart }) => {
        clearCart();
        hideReceipt();
    });
};

