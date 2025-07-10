
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
    if (response.ok) {
        printMovies(); //para que se impriman las peliculas que quedan en el db despues de haber borrado alguna
        console.log(`Película ${id} eliminada`); //para que me diga el id de la pelicula que borre
    }
    else {
        console.error('Error al eliminar la película');
    }
}


//PRINT
let moviesContainer = document.querySelector("section")

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
    return movieList
}


//Create Método POST
async function createMovie(newMovie) {
    try{//bloque try para manejar errores de forma segura
        const response = await fetch(`http://localhost:3000/movies`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie)//convertir el objeto a JSON
    });
    if (!response.ok) throw new Error("Error al crear la película");
        console.log("Película agregada correctamente");
        printMovies(); //actualizar la lista si estás mostrando los libros
    }
    catch (error) { //si algo falla este bloque atrapa el error
    console.error("Error al crear la película:", error.message);
    }
}

//para el formulario de agregado
document.getElementById("movieForm").addEventListener("submit", function(e) {
    e.preventDefault(); //funcion que evita que se recargue la pagina

    const newMovie = { //objeto de la nueva pelicula, osea como va a quedar la lista de peliculas cuando se submiteen
        title: document.getElementById("title").value, //value es el valor que introdujo el usuario en el input
        year: document.getElementById("year").value,
        genre: document.getElementById("genre").value,
        category: document.getElementById("category").value,
        synopsis: document.getElementById("synopsis").value
        //id: Date.now().toString()// genera un ID unico basado en el tiempo
    };
    createMovie(newMovie); //llama al metodo POST
});

//Update Método PUT/PATCH
async function updateMovie(id, editedMovie) { 
    const response = await fetch (`http://localhost:3000/movies/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedMovie),
    });

    if (response.ok) {
        console.log("Película actualizada correctamente");
        printMovies(); //esto vuelve a cargar la lista actualizada
    }
    else {
        console.error("Error al actualizar el libro")
    }
}

//para el formulario de edición

document.getElementById("editMovie").addEventListener("submit", function(e){
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
    document.getElementById("editMovie").style.display ="none";
});

//para cerrar el formulario una vez cancelada la edicion
    document.getElementById("cancelEdit").addEventListener("click", function(e){
        e.preventDefault();
        document.getElementById("editMovie").style.display="none";
        document.getElementById("forEdit").style.display="none";
    });

//FUNCION DE EDITFORM/EDITMOVIE
function showEditMovie(movie){
    console.log("Película recibida para editar", movie);

    //para mostrar el formulario
    document.getElementById("forEdit").style.display="block";
    document.getElementById("editMovie").style.display="block";

    //para que venga prellenado con los datos actuales
    document.getElementById("editId").value=movie.id;
    document.getElementById("editTitle").value=movie.title;
    document.getElementById("editDirector").value=movie.director;
    document.getElementById("editYear").value=movie.year;
    document.getElementById("editGenre").value=movie.genre;
    document.getElementById("editSynopsis").value=movie.synopsis;

    //para que la pagina se mueva al formulario automaticamente
    document.getElementById("editMovie").scrollIntoView({behavior:"instant"});
}