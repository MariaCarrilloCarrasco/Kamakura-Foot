import { getProducts } from './productsManager.js';

// DEBE buscar los productos por los filtros
export const filterProducts = (categoryFilter = 'todos') => {
    const products = getProducts();
    return categoryFilter === 'todos' 
        ? products 
        : products.filter(product => product.category === categoryFilter);
};


