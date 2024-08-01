function buscarLibro() {
    const bookId = document.getElementById('bookId').value.trim();
    const titulo = document.getElementById('tituloBusqueda').value.trim();
    const autor = document.getElementById('autorBusqueda').value.trim();

    if (bookId) {
        // Buscar por ID exacto
        const libro = librosBST.search(parseInt(bookId));
        if (libro) {
            mostrarResultadoBusqueda(libro);
        } else {
            mostrarMensaje('resultadoBusqueda', 'Libro no encontrado.', 'danger');
        }
    } else if (titulo || autor) {
        // Buscar por título o autor con aproximación
        const resultados = librosBST.searchByTitleOrAuthor(titulo, autor);
        if (resultados.length > 0) {
            mostrarResultadosBusqueda(resultados);
        } else {
            mostrarMensaje('resultadoBusqueda', 'Libro no encontrado.', 'danger');
        }
    } else {
        mostrarMensaje('resultadoBusqueda', 'Por favor, ingresa un ID, título o autor para buscar.', 'danger');
    }
}

function insertarLibro() {
    const titulo = document.getElementById('titulo').value.trim();
    const autor = document.getElementById('autor').value.trim();

    if (!titulo || !autor) {
        mostrarMensaje('resultadoInsercion', 'Por favor, ingresa tanto el título como el autor.', 'danger');
        return;
    }

    const nuevoId = Date.now();
    const nuevoLibro = { id: nuevoId, titulo, autor };
    librosBST.insert(nuevoId, nuevoLibro);
    mostrarMensaje('resultadoInsercion', 'Libro insertado exitosamente', 'success');

    fetch('insertar_libro.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoLibro)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            mostrarMensaje('resultadoInsercion', 'Libro insertado exitosamente en la base de datos.', 'success');
        } else {
            mostrarMensaje('resultadoInsercion', 'Error al insertar el libro en la base de datos.', 'danger');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarMensaje('resultadoInsercion', 'Error al insertar el libro en la base de datos.', 'danger');
    });
}

function eliminarLibro() {
    const bookId = document.getElementById('bookIdEliminar').value.trim();
    if (!bookId) {
        mostrarMensaje('resultadoEliminacion', 'Por favor, ingresa un ID de libro válido.', 'danger');
        return;
    }

    const libro = librosBST.delete(parseInt(bookId));
    if (libro) {
        mostrarMensaje('resultadoEliminacion', 'Libro eliminado exitosamente', 'success');

        fetch('eliminar_libro.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: parseInt(bookId) })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                mostrarMensaje('resultadoEliminacion', 'Libro eliminado exitosamente de la base de datos.', 'success');
            } else {
                mostrarMensaje('resultadoEliminacion', 'Error al eliminar el libro de la base de datos.', 'danger');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            mostrarMensaje('resultadoEliminacion', 'Error al eliminar el libro de la base de datos.', 'danger');
        });
    } else {
        mostrarMensaje('resultadoEliminacion', 'Libro no encontrado en la estructura de datos.', 'danger');
    }
}

function mostrarResultadoBusqueda(libro) {
    const resultadoBusqueda = document.getElementById('resultadoBusqueda');
    resultadoBusqueda.innerHTML = `<div class="alert alert-success">
        <strong>ID:</strong> ${libro.id}<br>
        <strong>Título:</strong> ${libro.titulo}<br>
        <strong>Autor:</strong> ${libro.autor}
    </div>`;
    resultadoBusqueda.style.display = 'block';
}

function mostrarResultadosBusqueda(libros) {
    const resultadoBusqueda = document.getElementById('resultadoBusqueda');
    let html = '';
    libros.forEach(libro => {
        html += `<div class="alert alert-success">
            <strong>ID:</strong> ${libro.id}<br>
            <strong>Título:</strong> ${libro.titulo}<br>
            <strong>Autor:</strong> ${libro.autor}
        </div>`;
    });
    resultadoBusqueda.innerHTML = html;
    resultadoBusqueda.style.display = 'block';
}

function mostrarMensaje(elementId, message, type) {
    const resultado = document.getElementById(elementId);
    resultado.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    resultado.style.display = 'block';
    setTimeout(() => {
        resultado.style.display = 'none';
    }, 5000);
}
