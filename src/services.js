
//Read Método GET
async function getAllMovies() {
    const response = await fetch(`http://localhost:3000/movies`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const movieData = await response.json()
    console.log(movieData)
    return movieData
}
getAllMovies()


//Método DELETE para eliminar 
async function deleteMovie(id) {
    const response = await fetch(`http://localhost:3000/movies/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const allMovies = await getAllMovies();//para que se impriman las peliculas que quedan en el db despues de haber borrado alguna
        
    if (response.ok) {
        console.log(`Película ${id} eliminada`); //para que me diga el id de la pelicula que borre
        displayMovies(allMovies);
    }
    else {
        console.error('Error al eliminar la película');
    }
}


/*PRINT
let moviesContainer = document.querySelector(".movies-container");


async function printMovies(params) {
    let movies = await getAllMovies();
    moviesContainer.innerHTML = ""
    const movieList = movies.map(movie => {
        return moviesContainer.innerHTML += `<h1>${movie.title}</h1>
        <p>${movie.director}</p>
        <p>${movie.year}</p>
        <p>${movie.genre}</p>
        <p>${movie.synopsis}</p>
        
        <button onclick="deleteMovie('${movie.id}')">Eliminar</button>
        <button onclick='showEditMovie(${JSON.stringify(movie)})'>Editar</button>`

    });

    document.getElementById('movies').scrollIntoView({ behavior: 'smooth' });
    return movieList
}*/

async function loadMovies() {
    const movies = await getAllMovies();
    displayMovies(movies);

     // Marcar botón "Todas" como activo
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));

    const allBtn = document.querySelector('[data-filter="all"]');
    if (allBtn) allBtn.classList.add('active');

    // Actualizar filtros globales
    currentFilter = 'all';
    currentSearch = '';
    document.getElementById("searchInput").value = '';

    document.getElementById('movies').scrollIntoView({ behavior: 'smooth' });
    
}

//Create Método POST
async function createMovie(newMovie) {
    try {//bloque try para manejar errores de forma segura
        const response = await fetch(`http://localhost:3000/movies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMovie)//convertir el objeto a JSON
        });
        if (!response.ok) throw new Error("Error al crear la película");
        console.log("Película agregada correctamente");
        const allMovies = await getAllMovies();
        displayMovies(allMovies); //actualizar la lista si estás mostrando los libros
    }
    catch (error) { //si algo falla este bloque atrapa el error
        console.error("Error al crear la película:", error.message);
    }
}

//para el formulario de agregado
document.getElementById("movieForm").addEventListener("submit", function (e) {
    e.preventDefault(); //funcion que evita que se recargue la pagina

    const newMovie = { //objeto de la nueva pelicula, osea como va a quedar la lista de peliculas cuando se submiteen
        title: document.getElementById("title").value, //value es el valor que introdujo el usuario en el input
        year: document.getElementById("year").value,
        genre: document.getElementById("genre").value,
        director: document.getElementById("director").value,
        synopsis: document.getElementById("synopsis").value
        //id: Date.now().toString()// genera un ID unico basado en el tiempo
    };
    createMovie(newMovie); //llama al metodo POST
});

//Update Método PUT/PATCH
async function updateMovie(id, editedMovie) {
    const response = await fetch(`http://localhost:3000/movies/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedMovie),
    });

    if (response.ok) {
        console.log(`Película ${editedMovie.title} actualizada correctamente`);
        alert('Pelicula ' + editedMovie.title + ' actualizada con éxito')
        const allMovies = await getAllMovies();
        displayMovies(allMovies); //esto vuelve a cargar la lista actualizada
    }
    else {
        console.error("Error al actualizar el libro")
    }
}

//para el formulario de edición

document.getElementById("editMovie").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("editId").value;

    const editedMovie = {
        title: document.getElementById("editTitle").value,
        year: document.getElementById("editYear").value,
        genre: document.getElementById("editGenre").value,
        director: document.getElementById("editDirector").value,
        synopsis: document.getElementById("editSynopsis").value
    };

    updateMovie(id, editedMovie);

    //para ocultar el formulario despues de actualizar
    document.getElementById("editMovie").style.display = "none";
});

//para cerrar el formulario una vez cancelada la edicion
document.getElementById("cancelEdit").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("editMovie").style.display = "none";
    document.getElementById("forEdit").style.display = "none";
});

//FUNCION DE EDITFORM/EDITMOVIE
function showEditMovie(movie) {
    console.log("Película recibida para editar", movie);

    //para mostrar el formulario
    document.getElementById("forEdit").style.display = "block";
    document.getElementById("editMovie").style.display = "block";

    //para que venga prellenado con los datos actuales
    document.getElementById("editId").value = movie.id;
    document.getElementById("editTitle").value = movie.title;
    document.getElementById("editDirector").value = movie.director;
    document.getElementById("editYear").value = movie.year;
    document.getElementById("editGenre").value = movie.genre;
    document.getElementById("editSynopsis").value = movie.synopsis;

    //para que la pagina se mueva al formulario automaticamente
    document.getElementById("editMovie").scrollIntoView({ behavior: "instant" });
}

//WEB
//Elementos del DOM
const moviesGrid = document.getElementById('moviesGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('movieModal');
const modalContent = document.getElementById('modalContent');

//variables de estado de la pagina
let currentFilter = 'all';//filtro por defecto de peliculas activas
let currentSearch = '';//para el texto de busqueda


//inicialización
document.addEventListener('DOMContentLoaded', async function () {
    const movies = await getAllMovies();
    displayMovies(movies);
});

searchInput.addEventListener('input', function () {
    //funcion de busqueda
    currentSearch = this.value.toLowerCase();
    filterAndDisplayMovies(); //Cada vez que el usuario escribe en el campo de búsqueda: guarda el texto lo filtra y muestra las peliculas
})

//Botones de filtro
filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        filterButtons.forEach(btn => btn.classList.remove('active'));//quita la clase active de todos los botones
        this.classList.add('active');//añade active al boton clickeado

        currentFilter = this.dataset.filter;//guarda el boton de filtro seleccionado
        filterAndDisplayMovies();//filtra y muestra las peliculas
    });
});

//botones de categoria
//const todas = document.querySelector('all')

//Funcion de filtrado y muestra de las peliculas
async function filterAndDisplayMovies() {
    let filteredMovies = await getAllMovies();

    //para el filtro por busqueda
    if (currentSearch) {
        filteredMovies = filteredMovies.filter(movie =>
            movie.title.toLowerCase().includes(currentSearch) ||
            movie.genre.toLowerCase().includes(currentSearch) ||
            movie.director.toLowerCase().includes(currentSearch)
        );
    }
    displayMovies(filteredMovies)


    //para filtro por categoria/genero
    if (currentFilter !== 'all') {
        filteredMovies = filteredMovies.filter(movie =>
            movie.genre.toLowerCase().includes(currentFilter) ||
            currentFilter === 'ciencia-ficcion' && movie.genre.toLowerCase().includes('ciencia-ficcion')
        );
    }
    displayMovies(filteredMovies);
}

//funcion de visualizacion
function displayMovies(getAllMovies) {
    moviesGrid.innerHTML = "";

    if (getAllMovies.length === 0) {
        moviesGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: rgba(255,255,255,0.6);"><h3>No se encontraron películas</h3><p>Intenta con otros términos de búsqueda</p></div>';
        return;
    }
    getAllMovies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesGrid.appendChild(movieCard);
    });
}

//funcion de creacion de tarjetas para las peliculas
function createMovieCard(movie) {
    console.log("Renderizando película:", movie);
    const card = document.createElement('div');
    card.className = 'movie-card fade in';
    card.onclick = () => openModal(movie);

    card.innerHTML = `<div class="movie-poster" style="background-image: url('${movie.image || 'https://via.placeholder.com/300x400?text=Sin+Imagen'}'); background-size: cover; background-position:;">
                </div>
                <div class="movie-info">
                    <div class="movie-title">${movie.title}</div>
                    <div class="movie-genre">${movie.genre}</div>
                    <span class="movie-year">${movie.year}</span>
                    <div class="movie-meta">
                        <button class="delete-btn" onclick='event.stopPropagation();deleteMovie("${movie.id}")'>Eliminar</button>
                        <button class="edit-btn" onclick='event.stopPropagation();showEditMovie(${JSON.stringify(movie)})'>Editar</button>
                    </div>
            </div>`;
    return card;
}

//cierre modal
modal.addEventListener('click', function (e) {
    if (e.target === modal) {
        closeModal();
    }
});

function openModal(movie) {
    modalContent.innerHTML = ` <h2 style="color: #ffcc02; margin-bottom: 1rem;">${movie.title}</h2>
                <div style="margin-bottom: 1rem;">
                    <span style="color: #ff6b35; font-weight: bold;">Género:</span> ${movie.genre} | 
                    <span style="color: #ff6b35; font-weight: bold;">Año:</span> ${movie.year} | 
                </div>
                <div style="margin-bottom: 1rem;">
                    <span style="color: #ff6b35; font-weight: bold;">Director:</span> ${movie.director}
                </div>
            
                <div style="margin-bottom: 2rem; line-height: 1.6;">
                    <span style="color: #ff6b35; font-weight: bold;">Sinopsis:</span><br>
                    ${movie.synopsis}
                </div>
                <div style="text-align: center;">
                    <button class="close-btn" onclick="closeModal()">&times;</button>
                </div>`

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}


document.addEventListener('scroll', function () {
    const cards = document.querySelectorAll('.movie-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});