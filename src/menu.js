import { filters } from '../assents/data/data.js';
import { initializeEvents } from './events.js';
import { filterProducts } from './searcher.js';

// DEBE imprimir en pantalla la información de filtros.
export const renderFilters = () => {
    const filtersContainer = document.getElementById('filters');
    if (!filtersContainer) return;
    
    // Clear static content
    filtersContainer.innerHTML = '';
    
    filters.forEach(filter => {
        const button = document.createElement('button');
        button.className = 'filter';
        button.textContent = filter;
        
        // Add event listener to filter products when clicked
        button.addEventListener('click', () => {
            renderProducts(filter);
        });
        
        filtersContainer.appendChild(button);
    });
};

// DEBE imprimir en pantalla los productos, con su Título, descripción y precio en € y botón de añadir.
export const renderProducts = (categoryFilter = 'todos') => {
    const productsContainer = document.getElementById('products');
    if (!productsContainer) return;
    
    // Clear static content
    productsContainer.innerHTML = '';
    
    // Filter products based on selected category using our searcher module
    const filteredProducts = filterProducts(categoryFilter);
    
    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-container';
        
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price-container">
                <h5>${product.price.toFixed(2)} €</h5>
                <button class="add-button" data-id="${product.id}">Añadir</button>
            </div>
        `;
        
        productsContainer.appendChild(productDiv);
    });
};

// Execute rendering when the script loads
renderFilters();
renderProducts();
initializeEvents();
