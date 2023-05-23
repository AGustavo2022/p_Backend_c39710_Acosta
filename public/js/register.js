const formRegister = document.querySelector('#formRegister')

if (formRegister instanceof HTMLFormElement) {
  formRegister.addEventListener('submit', async event => {
    event.preventDefault()

    const input_name = document.querySelector('#input_name')
    const input_lastname = document.querySelector('#input_lastname')
    const input_email = document.querySelector('#input_email')
    const input_password = document.querySelector('#input_password')
    const input_rol = document.querySelector('#input_rol')

    if (
      input_name instanceof HTMLInputElement &&
      input_lastname instanceof HTMLInputElement &&
      input_email instanceof HTMLInputElement &&
      input_password instanceof HTMLInputElement &&
      input_rol instanceof HTMLInputElement
    ) {

      const datosUsuario = {
        email: input_email.value,
        password: input_password.value,
        name: input_name.value,
        lastname: input_lastname.value,
        rol: input_rol.value
      }

      console.log(datosUsuario)
      
      const usuarioCreado = await fetch('/api/usuarios', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
      }).then(res => res.json())

    }
  })
}