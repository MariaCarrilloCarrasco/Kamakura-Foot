import { describe, it, expect, beforeEach } from 'vitest';
import { addToCart, removeFromCart, updateQuantity, clearCart, calculateTotal, getCart } from '../src/cart.js';
import { products } from '../assents/data/data.js';

describe('Cart Logic', () => {
    beforeEach(() => {
        // Configuramos la estructura básica del DOM que espera cart.js para poder renderizar
        document.body.innerHTML = `
            <div id="cart-container"></div>
            <div id="cart-products"></div>
            <h2 id="cart-total">Total: 0.00 €</h2>
        `;
        
        // Vaciamos el carrito antes de cada test para evitar interferencias
        clearCart();
    });

    it('addToCart debe añadir un producto y establecer su cantidad en 1', () => {
        const product = products[0]; // Miso Ramen, id: 0
        addToCart(product.id);
        
        const cart = getCart();
        expect(cart.length).toBe(1);
        expect(cart[0].id).toBe(product.id);
        expect(cart[0].quantity).toBe(1);
    });

    it('addToCart no debe añadir productos duplicados', () => {
        const product = products[0];
        addToCart(product.id);
        addToCart(product.id); // Intentamos añadirlo de nuevo
        
        const cart = getCart();
        expect(cart.length).toBe(1); // La longitud sigue siendo 1, no se duplicó
    });

    it('removeFromCart debe eliminar un producto del carrito por su ID', () => {
        addToCart(products[0].id);
        addToCart(products[1].id);
        
        removeFromCart(products[0].id);
        
        const cart = getCart();
        expect(cart.length).toBe(1);
        expect(cart[0].id).toBe(products[1].id); // Solo queda el segundo producto
    });

    it('updateQuantity debe sumar o restar la cantidad correctamente', () => {
        addToCart(products[0].id); // Empieza en 1
        updateQuantity(products[0].id, 2); // Sumamos 2
        
        let cart = getCart();
        expect(cart[0].quantity).toBe(3); // 1 + 2 = 3
        
        updateQuantity(products[0].id, -1); // Restamos 1
        cart = getCart();
        expect(cart[0].quantity).toBe(2); // 3 - 1 = 2
    });

    it('updateQuantity debe eliminar el producto si la cantidad es 0 o menor', () => {
        addToCart(products[0].id); // Empieza en 1
        updateQuantity(products[0].id, -1); // Le quitamos 1, la cantidad llega a 0
        
        const cart = getCart();
        expect(cart.length).toBe(0); // El carrito debe estar vacío
    });

    it('calculateTotal debe calcular la suma total (precio * cantidad) de todos los productos', () => {
        addToCart(products[0].id); // Miso Ramen (9.50)
        addToCart(products[1].id); // Mochi (2.50)
        
        // Sumamos 1 más al Ramen (2 x 9.50 = 19.00)
        updateQuantity(products[0].id, 1); 
        
        // Total esperado: 19.00 + 2.50 = 21.50
        const total = calculateTotal();
        expect(total).toBe(21.50);
    });
    
    it('addToCart/renderCart debe actualizar el texto del total en el DOM', () => {
        addToCart(products[0].id); // Al añadir, llama a renderCart
        const cartTotalElement = document.getElementById('cart-total');
        expect(cartTotalElement.textContent).toBe('Total: 9.50 €');
    });
});
