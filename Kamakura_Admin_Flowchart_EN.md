# Kamakura Admin - Architecture Flowchart

This document contains the English translation of the Kamakura Admin flowchart. You can view the diagram below, and since this is a Markdown (`.md`) file, you can easily download it, share it, or convert it to PDF using any standard editor like Visual Studio Code.

## Flowchart Diagram

```mermaid
graph TD
    %% Define Styles
    classDef blueOval fill:#3498db,stroke:#2980b9,stroke-width:2px,color:#fff,rx:20,ry:20;
    classDef blueRect fill:#3498db,stroke:#2980b9,stroke-width:2px,color:#fff;
    classDef redRect fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:#fff;
    classDef greenRect fill:#2ecc71,stroke:#27ae60,stroke-width:2px,color:#fff;
    classDef orangeRect fill:#e67e22,stroke:#d35400,stroke-width:2px,color:#fff;

    %% Nodes
    A(["KAMAKURA ADMIN"]):::blueOval
    
    B["General Dashboard"]:::blueRect
    C["Catalog"]:::redRect
    D["Return to Store"]:::blueRect
    
    E["Today's Sales"]:::greenRect
    F["Today's Orders"]:::redRect
    G(["Average Ticket"]):::blueOval
    H["Recent Orders"]:::greenRect
    I["Sales Trends"]:::redRect
    
    J["Allows viewing and modifying <br> the product catalog offered"]:::redRect
    K["Add Product"]:::blueRect
    L["Edit"]:::orangeRect
    M["Delete"]:::greenRect
    
    N["Previous View"]:::greenRect
    O(["Start Over"]):::blueOval

    %% Connections
    A --> B
    A --> C
    A --> D
    
    B --> E
    E --> F
    E --> G
    E --> H
    E --> I
    
    C --> J
    J --> K
    J --> L
    J --> M
    
    D --> N
    N --> O
```

## Text Breakdown (English Translation)

1. **KAMAKURA ADMIN**
   - **General Dashboard** (*Panel General*)
     - **Today's Sales** (*Ventas del dia*)
       - **Today's Orders** (*Pedidos de hoy*)
       - **Average Ticket** (*Ticket medio*)
       - **Recent Orders** (*Pedidos Recientes*)
       - **Sales Trends** (*Tendencias de ventas*)
   
   - **Catalog** (*Catálogo*)
     - **Allows viewing and modifying the product catalog offered** (*Permite visualizar y modificar el catálogo de productos que ofrecen*)
       - **Add Product** (*Añadir producto*)
       - **Edit** (*Editar*)
       - **Delete** (*Eliminar*)
       
   - **Return to Store** (*Volver a la tienda*)
     - **Previous View** (*Vista anterior*)
       - **Start Over** (*Vuelve a empezar*)
