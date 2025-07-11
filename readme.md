# 🎬 Cine de Verano - CRUD de Películas

**Cine de Verano** es una aplicación web que permite gestionar una cartelera de películas mediante operaciones **CRUD** (Crear, Leer, Actualizar y Eliminar). Está pensada como una herramienta para que los usuarios puedan explorar, agregar y editar películas para disfrutar durante las vacaciones.

---

## 🚀 Tecnologías Utilizadas

- **HTML5**: Estructura semántica de la interfaz.
- **CSS**: Estilos personalizados y diseño responsive.
- **JavaScript (Vanilla)**: Lógica del cliente y manipulación del DOM.
- **Fetch API**: Comunicación con el backend (simulado con JSON Server).
- **JSON Server**: Backend REST simulado para operaciones CRUD.
- **Git & GitHub**: Control de versiones y colaboración.

---

## 🧩 Funcionalidades Principales (CRUD)

### 🔹 CREATE (Crear)
- Un formulario permite agregar nuevas películas con título, año, género, director, sinopsis y una URL de imagen.
- Los datos se envían mediante `POST` a la API simulada.

### 🔹 READ (Leer)
- Al iniciar, se muestran todas las películas disponibles desde el servidor (`GET`).
- Se puede buscar por título, director o género.
- También se puede filtrar por categorías (Acción, Comedia, Drama, etc.).

### 🔹 UPDATE (Actualizar)
- Cada tarjeta tiene un botón **Editar** que abre un formulario con los datos precargados.
- Permite modificar cualquier campo y se guarda mediante `PUT`.

### 🔹 DELETE (Eliminar)
- Cada tarjeta tiene un botón **Eliminar** que borra la película del servidor (`DELETE`) y actualiza la vista sin recargar.

---

## 🧠 Retos enfrentados

- 🐞 **Eventos y propagación:** fue necesario manejar `event.stopPropagation()` para evitar que el clic en los botones dentro de una tarjeta abriera el modal por error.
- 🔗 **Carga de imágenes por URL:** implementar correctamente el uso de URLs externas sin descargas y asegurar compatibilidad al renderizar.
- 🧪 **Actualización dinámica:** mantener la interfaz sincronizada tras cada operación CRUD sin recargar la página.

---

## 📌 Cómo ejecutar el proyecto

1. Clona el repositorio:
   ```bash
   git clone https://github.com/MichelleGel/cine-de-verano-CRUD.git
   cd cine-de-verano 
   ```

    2.Instala JSON Server si no lo tienes:
    ```bash
    bash
    Copiar
    Editar
    npm install -g json-server
    ```
    3.Inicia el servidor:

    ```bash
    Copiar
    Editar
    json-server --watch db.json --port 3000
    ```

    4.Abre index.html en tu navegador.


#
Y eso es todo, disfruta de este verano junto a las personas mas importantes en tu vida, y si se quedan sin ideas, ya saben hay peliculas increibles para pasar un buen rato.
#

