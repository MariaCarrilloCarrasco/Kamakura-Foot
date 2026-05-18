import { products } from '../assents/data/data.js';

let cart = [];

// Toggle cart visibility
export const toggleCart = () => {
    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
        cartContainer.classList.toggle('active'); // assuming 'active' toggles visibility based on cart.css
        // If there's a specific class or style in cart.css to open the cart, let's assume it's just toggling display or a class.
        // The instructions say "abra el elemento que lo contiene y al volver hacer click, lo cierre. No debes preocuparte por los estilos porque ya existen en el archivo cart.css"
        // Let's check cart.css to see the exact class. Usually it's 'active' or 'show'.
        if(cartContainer.style.display === 'none' || cartContainer.style.display === '') {
            cartContainer.style.display = 'block';
        } else {
            cartContainer.style.display = 'none';
        }
    }
};

export const getCart = () => cart;

export const addToCart = (productId) => {
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        // Can't add twice per instructions, maybe just return or increase qty
        // Instructions: "No puedes añadir dos veces el mismo plato."
        return; 
    }
    
    cart.push({ ...product, quantity: 1 });
    renderCart();
};

export const removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
};

export const clearCart = () => {
    cart = [];
    renderCart();
};

export const updateQuantity = (productId, change) => {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        renderCart();
    }
};

export const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const renderCart = () => {
    const cartProductsContainer = document.getElementById('cart-products');
    const cartTotalElement = document.getElementById('cart-total');
    if (!cartProductsContainer) return;
    
    cartProductsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartProductsContainer.innerHTML = '<h3>Añade un plato a tu menú</h3>';
        if (cartTotalElement) cartTotalElement.textContent = 'Total: 0.00 €';
        return;
    }
    
    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-container';
        
        cartItemDiv.innerHTML = `
            <button class="close-button" data-id="${item.id}">
                <img src="./assents/img/close.svg" alt="close">
            </button>
            <div class="text-container">
                <h3>${item.name}</h3>
                <h5>${(item.price * item.quantity).toFixed(2)} €</h5>
            </div>
            <div class="quantity-container" id="quantity">
                <button class="decrease-qty" data-id="${item.id}">-</button>
                <p class="quantity">${item.quantity}</p>
                <button class="increase-qty" data-id="${item.id}">+</button>
            </div>
        `;
        
        cartProductsContainer.appendChild(cartItemDiv);
    });
    
    if (cartTotalElement) {
        cartTotalElement.textContent = `Total: ${calculateTotal().toFixed(2)} €`;
    }
};


