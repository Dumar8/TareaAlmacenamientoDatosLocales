document.getElementById('clientForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const cedula = document.getElementById('cedula').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const namePattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    
    if (!namePattern.test(firstName)) {
        alert('Nombres: Solo se permiten letras y caracteres con acentos.');
        return;
    }
    
    if (!namePattern.test(lastName)) {
        alert('Apellidos: Solo se permiten letras y caracteres con acentos.');
        return;
    }
    
    if (!validarCedulaEcuatoriana(cedula)) {
        alert('Cédula: Número de cédula inválido.');
        return;
    }

    if (!validarTelefonoEcuatoriano(phone)) {
        alert('Teléfono: Número de teléfono inválido.');
        return;
    }

    // Guardar datos en localStorage
    const cliente = {
        firstName: firstName,
        lastName: lastName,
        cedula: cedula,
        address: address,
        phone: phone,
        email: email
    };

    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));

    console.log('Datos guardados en localStorage:', cliente);
    
    alert('Datos enviados y guardados con éxito en localStorage!');
});

function validarCedulaEcuatoriana(cedula) {
    if (cedula.length !== 10) return false;
    
    const provincia = parseInt(cedula.slice(0, 2), 10);
    const tercerDigito = parseInt(cedula.charAt(2), 10);

    if (provincia < 1 || provincia > 24 || tercerDigito > 5) return false;
    
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;

    for (let i = 0; i < 9; i++) {
        let digito = parseInt(cedula.charAt(i), 10) * coeficientes[i];
        suma += (digito > 9) ? digito - 9 : digito;
    }

    const digitoVerificador = parseInt(cedula.charAt(9), 10);
    const residuo = suma % 10;
    const digitoCalculado = residuo === 0 ? 0 : 10 - residuo;

    return digitoVerificador === digitoCalculado;
}

function validarTelefonoEcuatoriano(phone) {
    if (phone.length !== 9 && phone.length !== 10) return false;
    
    if (phone.length === 10 && phone.startsWith('09')) return true;

    const provincia = parseInt(phone.slice(0, 2), 10);
    if (phone.length === 9 && provincia >= 2 && provincia <= 7) return true;
    
    return false;
}