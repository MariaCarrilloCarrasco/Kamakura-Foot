import { products as initialProducts } from '../assents/data/data.js';

// Inicializar localStorage si no existe
if (!localStorage.getItem('kamakura_products')) {
    localStorage.setItem('kamakura_products', JSON.stringify(initialProducts));
}

// Obtiene los productos desde localStorage
export const getProducts = () => {
    return JSON.parse(localStorage.getItem('kamakura_products'));
};

// Guarda los productos actualizados de vuelta a localStorage
export const saveProducts = (newProductsList) => {
    localStorage.setItem('kamakura_products', JSON.stringify(newProductsList));
};
