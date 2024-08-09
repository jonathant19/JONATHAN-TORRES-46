// Array de usuarios con sus respectivas claves
const usuarios = [
    { id: 1, usuario: 'usuario1', clave: '1234' },
    { id: 2, usuario: 'usuario2', clave: '5678' },
    { id: 3, usuario: 'usuario3', clave: '9101' },
    { id: 4, usuario: 'usuario4', clave: '1121' },
    { id: 5, usuario: 'usuario5', clave: '3141' }
];

// número de intentos fallidos y usuarios bloqueados 
let intentos = JSON.parse(localStorage.getItem('intentos')) || {};
let bloqueados = JSON.parse(localStorage.getItem('bloqueados')) || {};

// formulario de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();  

    const usuario = document.getElementById('usuario').value;  // Obtener el nombre de usuario ingresado
    const clave = document.getElementById('clave').value;  // Obtener la clave ingresada
    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario);  // Buscar el usuario en la lista

    if (!usuarioEncontrado) {
        alert('Usuario incorrecto');  // Mostrar alerta si el usuario no existe
        return;
    }

    if (bloqueados[usuario]) {
        alert('Usuario bloqueado. Demasiados intentos.');  // alerta si el usuario está bloqueado
        return;
    }

    if (usuarioEncontrado.clave === clave) {
        alert('Inicio de sesión exitoso');  // alerta si el inicio de sesión es exitoso
        intentos[usuario] = 0;  
        localStorage.setItem('intentos', JSON.stringify(intentos)); 
    } else {
        alert('Clave incorrecta');  // Mostrar alerta si la clave es incorrecta
        intentos[usuario] = (intentos[usuario] || 0) + 1;  // Incrementar el contador de intentos fallidos
        if (intentos[usuario] >= 3) {
            alert('Usuario bloqueado por demasiados intentos fallidos');  // Bloquear al usuario si se exceden los intentos fallidos en este caso 3 intentos 
            bloqueados[usuario] = true;  // Marcar al usuario como bloqueado
        }
        localStorage.setItem('intentos', JSON.stringify(intentos));  // Guardar el número de intentos en localStorage
        localStorage.setItem('bloqueados', JSON.stringify(bloqueados));  // Guardar el estado de bloqueo en localStorage
    }
});
