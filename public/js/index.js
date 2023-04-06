const serverSocket = io('http://localhost:8080')

const container = document.getElementById('container') ?? null

const template = `

{{#if productExist}}
    <ul>
        {{#each product}}
            <li>
                <p>id = {{this.id}}</p>
                <p>title = {{this.title}}</p>
                <p>description = {{this.description}}</p>
                <p>prince = {{this.prince}}</p>
                <p>status = {{this.status}}</p>
                <p>stock = {{this.stock}}</p>
                <p>category = {{this.category}}</p>
                <p>thumbnail = {{this.thumbnail}}</p>
            </li>
        {{/each}}  
    </ul>
{{else}}
    <p> Sin Productos</p>
{{/if}}
`

const compileTemplate = Handlebars.compile(template)



serverSocket.on('updateList', (data) => {
  console.log('updateList')
  console.log(data)
  if (container !== null) {
    container.innerHTML = compileTemplate({
      encabezado: 'Home | Products',
      product: data.product,
      productExist: data.productExist,
    })
  }
})

serverSocket.emit('message', 'Holo me conecte desde  la web')