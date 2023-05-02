const formRegister = document.querySelector('#formRegister')

if (formRegister instanceof HTMLFormElement) {
  formRegister.addEventListener('submit', async event => {
    event.preventDefault()

    const input_nick = document.querySelector('#input_nick')
    const input_email = document.querySelector('#input_email')
    const input_password = document.querySelector('#input_password')

    if (
      input_nick instanceof HTMLInputElement &&
      input_email instanceof HTMLInputElement &&
      input_password instanceof HTMLInputElement
    ) {

      const datosUsuario = {
        nick: input_nick.value,
        email: input_email.value,
        password: input_password.value,
      }

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