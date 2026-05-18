import { getProducts, saveProducts } from './productsManager.js';
import { filters } from '../assents/data/data.js';

document.addEventListener('DOMContentLoaded', () => {
    // Referencias DOM
    const btnNavDashboard = document.getElementById('btn-nav-dashboard');
    const btnNavCatalog = document.getElementById('btn-nav-catalog');
    
    const sectionDashboard = document.getElementById('section-dashboard');
    const sectionCatalog = document.getElementById('section-catalog');
    const sectionTitle = document.querySelector('.main-header h1');
    
    const catalogTableBody = document.getElementById('catalog-table-body');
    const btnAddProduct = document.getElementById('btn-add-product');
    
    // Modal
    const productModal = document.getElementById('product-modal');
    const btnModalClose = document.getElementById('btn-modal-close');
    const btnModalCancel = document.getElementById('btn-modal-cancel');
    const productForm = document.getElementById('product-form');
    const modalTitle = document.getElementById('modal-title');
    
    // Campos del Formulario
    const inputId = document.getElementById('product-id');
    const inputName = document.getElementById('product-name');
    const selectCategory = document.getElementById('product-category');
    const inputPrice = document.getElementById('product-price');
    const inputDescription = document.getElementById('product-description');
    
    // ----------------------------------------------------
    // 1. Navegación entre Secciones
    // ----------------------------------------------------
    const showSection = (sectionName) => {
        if (sectionName === 'dashboard') {
            sectionDashboard.classList.remove('hidden');
            sectionCatalog.classList.add('hidden');
            btnNavDashboard.classList.add('active');
            btnNavCatalog.classList.remove('active');
            sectionTitle.textContent = 'Panel General';
        } else {
            sectionDashboard.classList.add('hidden');
            sectionCatalog.classList.remove('hidden');
            btnNavDashboard.classList.remove('active');
            btnNavCatalog.classList.add('active');
            sectionTitle.textContent = 'Catálogo (CMS)';
            renderCatalogTable();
        }
    };

    btnNavDashboard.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('dashboard');
    });

    btnNavCatalog.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('catalog');
    });

    // ----------------------------------------------------
    // 2. Cargar Categorías en el Formulario
    // ----------------------------------------------------
    const loadCategories = () => {
        selectCategory.innerHTML = '';
        // Filtrar 'todos' para que no sea una categoría seleccionable
        const validCategories = filters.filter(cat => cat !== 'todos');
        
        validCategories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
            selectCategory.appendChild(option);
        });
    };
    loadCategories();

    // ----------------------------------------------------
    // 3. Renderizar la Tabla del Catálogo (CMS)
    // ----------------------------------------------------
    const renderCatalogTable = () => {
        const products = getProducts();
        catalogTableBody.innerHTML = '';

        if (products.length === 0) {
            catalogTableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; color: var(--text-secondary); padding: 2rem;">
                        No hay productos en el catálogo. ¡Añade uno nuevo!
                    </td>
                </tr>
            `;
            return;
        }

        products.forEach(product => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${product.id}</td>
                <td style="font-weight: 500;">${product.name}</td>
                <td><span class="product-cat-tag">${product.category}</span></td>
                <td class="product-price-cell">${product.price.toFixed(2)} €</td>
                <td><div class="product-desc-cell" title="${product.description}">${product.description}</div></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action edit" data-id="${product.id}">Editar</button>
                        <button class="btn-action delete" data-id="${product.id}">Eliminar</button>
                    </div>
                </td>
            `;
            catalogTableBody.appendChild(tr);
        });
        
        // Actualizar KPIs de Analytics simulados
        updateDashboardKPIs(products);
    };

    // ----------------------------------------------------
    // 4. Actualizar Métricas del Dashboard (E-commerce)
    // ----------------------------------------------------
    const updateDashboardKPIs = (products) => {
        const kpiSales = document.getElementById('kpi-sales');
        const kpiOrders = document.getElementById('kpi-orders');
        const kpiAverage = document.getElementById('kpi-average');
        
        if (!kpiSales || !kpiOrders || !kpiAverage) return;
        
        // Simulamos ventas basándonos en la variedad y precios de nuestros productos
        const totalProductsCount = products.length;
        const totalSum = products.reduce((acc, p) => acc + p.price, 0);
        
        // Simulación dinámica pero realista
        const orderCount = Math.round(totalProductsCount * 0.4) + 5;
        const salesTotal = (totalSum * 1.5).toFixed(2);
        const ticketAverage = (salesTotal / orderCount).toFixed(2);

        kpiSales.textContent = `${salesTotal} €`;
        kpiOrders.textContent = orderCount.toString();
        kpiAverage.textContent = `${ticketAverage} €`;
    };

    // ----------------------------------------------------
    // 5. Gestión del Modal (Añadir / Editar)
    // ----------------------------------------------------
    const openModal = (id = null) => {
        productModal.classList.remove('hidden');
        if (id !== null) {
            // Modo Edición
            const products = getProducts();
            const product = products.find(p => p.id === parseInt(id));
            if (product) {
                modalTitle.textContent = 'Editar Plato';
                inputId.value = product.id;
                inputName.value = product.name;
                selectCategory.value = product.category;
                inputPrice.value = product.price;
                inputDescription.value = product.description;
            }
        } else {
            // Modo Añadir
            modalTitle.textContent = 'Añadir Nuevo Plato';
            productForm.reset();
            inputId.value = '';
        }
    };

    const closeModal = () => {
        productModal.classList.add('hidden');
        productForm.reset();
    };

    btnAddProduct.addEventListener('click', () => openModal());
    btnModalClose.addEventListener('click', closeModal);
    btnModalCancel.addEventListener('click', closeModal);

    // Cerrar modal al hacer click fuera de la tarjeta
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeModal();
        }
    });

    // ----------------------------------------------------
    // 6. Guardar Cambios (Crear / Actualizar)
    // ----------------------------------------------------
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = inputId.value;
        const name = inputName.value.trim();
        const category = selectCategory.value;
        const price = parseFloat(inputPrice.value);
        const description = inputDescription.value.trim();
        
        const products = getProducts();
        
        if (id) {
            // Edición
            const index = products.findIndex(p => p.id === parseInt(id));
            if (index !== -1) {
                products[index] = {
                    ...products[index],
                    name,
                    category,
                    price,
                    description
                };
            }
        } else {
            // Creación: Calculamos ID autoincremental
            const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 0;
            products.push({
                id: newId,
                name,
                category,
                price,
                description
            });
        }
        
        saveProducts(products);
        closeModal();
        renderCatalogTable();
    });

    // ----------------------------------------------------
    // 7. Acciones de Fila (Editar / Eliminar) - Delegación de Eventos
    // ----------------------------------------------------
    catalogTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit')) {
            const id = e.target.dataset.id;
            openModal(id);
        }
        
        if (e.target.classList.contains('delete')) {
            const id = parseInt(e.target.dataset.id);
            if (confirm('¿Estás seguro de que deseas eliminar este plato del catálogo?')) {
                const products = getProducts();
                const updatedProducts = products.filter(p => p.id !== id);
                saveProducts(updatedProducts);
                renderCatalogTable();
            }
        }
    });

    // Carga inicial
    renderCatalogTable();
});
