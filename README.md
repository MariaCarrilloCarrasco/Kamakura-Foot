# 🍱 Kamakura Food - Restaurante Japonés

Bienvenido al repositorio oficial de **Kamakura Food**, una aplicación web dinámica de alta fidelidad diseñada para un restaurante de comida japonesa. Combina una carta de cara al cliente interactiva y fluida con un panel de administración completo (CMS & E-commerce) con una estética oscura premium de tipo Glassmorphism.

---

## 📌 ¿En qué consiste el proyecto?

**Kamakura Food** ofrece una solución digital integrada y modular dividida en dos vistas principales totalmente sincronizadas en tiempo real:

1.  **Vista de Cliente (Carta y Pedidos):**
    *   **Impresión Dinámica del Menú:** Carga y dibuja de forma automatizada los filtros de categorías (Ramen, Sushi, Entradas, Postres, etc.) y los platos directamente desde el almacenamiento.
    *   **Carrito de Compras Interactivo:** Permite añadir platos, actualizar cantidades, calcular subtotales unitarios y el total acumulado al instante en pantalla, con capacidad de alternar (abrir/cerrar) al pulsar el botón de añadir del producto.
    *   **Generador de Tickets (Recibo):** Simula el proceso de finalización de compra y genera un ticket detallado en pantalla con el resumen del pedido.

2.  **Vista Administrativa (CMS & E-commerce Dashboard):**
    *   **Panel General (E-commerce):** Un dashboard con métricas de rendimiento en tiempo real (Ventas totales, volumen de pedidos y ticket promedio) acompañados de elegantes analíticas horarias en gráficos interactivos.
    *   **Gestor de Inventario (CMS):** Un panel que te permite añadir nuevos platos, editar la información de platos existentes (nombres, descripciones, categorías y precios) y eliminarlos del catálogo.
    *   **Conexión en Tiempo Real:** Todos los cambios en la administración se reflejan en tiempo real en la vista de cara al público gracias a una arquitectura unificada en base a `localStorage`.

---

## 🛠️ Tecnologías Usadas

El proyecto está diseñado bajo estrictos estándares de calidad utilizando tecnologías modernas y vanilla:

*   **Vite:** Servidor de desarrollo ultrarrápido y empaquetador moderno para la gestión del proyecto.
*   **JavaScript Moderno (ES6+):** Uso exhaustivo de programación funcional (`.map()`, `.filter()`, `.reduce()`, `.find()`, `.forEach()`), desestructuración de objetos, módulos ES (`import`/`export`) y *Template Strings* para evitar la concatenación imperativa antigua.
*   **HTML5 y CSS3 Vanilla:** Diseño altamente visual con técnicas premium de **Glassmorphism** (tarjetas translúcidas con desenfoque de fondo y bordes resplandecientes en degradados violeta/cyan) y una maquetación totalmente adaptable (*Responsive Layout* con CSS Grid y Flexbox).
*   **LocalStorage:** Usado como base de datos local en memoria del navegador para sincronizar el estado del catálogo entre la vista administrativa y la vista de cliente sin necesidad de un backend complejo.
*   **Vitest & JSDOM:** Suite completa para la ejecución de pruebas unitarias robustas, simulando el comportamiento del navegador y el DOM en memoria para el aseguramiento de la calidad del software.

---

## 🚀 Cómo Empezar a Utilizar el Proyecto

### Requisitos Previos
*   Tener instalado **Node.js** (versión 16 o superior).
*   Un navegador web moderno.

### Instalación
1.  Clona el repositorio en tu máquina local:
    ```bash
    git clone https://github.com/MariaCarrilloCarrasco/Kamakura-Foot.git
    ```
2.  Accede a la carpeta del proyecto:
    ```bash
    cd "Kamakura Food Restaurante de comida japonesa"
    ```
3.  Instala las dependencias necesarias:
    ```bash
    npm install
    ```

### Ejecutar el Proyecto en Modo Desarrollo
Para abrir el servidor local y ver la web en tiempo real:
```bash
npm run dev
```

### Ejecutar las Pruebas Unitarias
Para correr la suite de pruebas automatizadas y certificar la calidad de las funciones del carrito y la carta:
```bash
npm test
```

---

## 👥 Equipo de Desarrollo

Este proyecto ha sido desarrollado con pasión y enfoque centrado en la usabilidad por:

*   **María Carrillo Carrasco**
    *   **Rol:** Social Developer
    *   **Institución:** FactoriaF5
