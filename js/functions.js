const categoriasDestacadas = document.querySelector(".categorias-destacadas");
const novedades = document.querySelector(".novedades");
const botonCarrito = document.querySelector(".btn-carrito");
const modalCarrito = document.querySelector(".modal-carrito");
const botonesCerrarModal = document.querySelectorAll(".btn-cerrar-modal");
const contendorCarrito = document.querySelector(".contenedor-carrito");
const totalCompra = document.querySelector(".total");
const modalPerfil = document.querySelector(".modal-perfil");
const botonPerfil = document.querySelector(".btn-perfil");
const botonHamburguesa = document.querySelector(".btn-hamburguesa")
const menuLateral = document.querySelector(".menu-lateral");
const textoCuentaCreada = document.querySelector(".texto-cuenta-creada")
const inputsFormulario = document.querySelectorAll(".input-perfil")
const botonFormulario = document.querySelector(".btn-formulario")
const formPerfil = document.querySelector(".form-perfil")
const textoNewsletter = document.querySelector(".texto-newsletter")
const inputNewsletter = document.querySelector(".newsletter input")
const formNewsletter = document.querySelector(".newsletter")
const inputBuscador = document.querySelector(".buscador input");

let listaCarrito = [];

// creamos este boton para darle scope global
let botonQuitarProducto = null

function mostrarCarrito(){
    // lo vaciamos para empezar
    contendorCarrito.innerHTML = ""
    let sumaTotal = 0

    // si el carrito no esta vacio
    if(listaCarrito.length != 0){
        // recorremos cada articulo del carrito
        listaCarrito.forEach( productoCarrito => {
            // le creamos un elemento div y la clase
            let divProductoCarrito = document.createElement("div")
            divProductoCarrito.classList.add("producto-carrito")

            // añadimos el html al div que acabamos de crear con propiedades de la api como images, title y price
            divProductoCarrito.innerHTML = `
                <img src="${productoCarrito.images[0]}">
                <p>${productoCarrito.title}</p>
                <p>${productoCarrito.price} €</p>
                <button class="btn-quitar-producto">X</button>
            `
            // añadimos el elemnto al DOM
            contendorCarrito.appendChild(divProductoCarrito);

            // sumamos sus precios para mostrarlo en total a pagar
            sumaTotal += productoCarrito.price

            // seleccionamos el boton para eliminar articulos del carrito
            botonQuitarProducto = divProductoCarrito.querySelector(".btn-quitar-producto")
            botonQuitarProducto.addEventListener("click", () => {
                divProductoCarrito.remove()
            })
        })
    // cuando el carrito esta vacio
    }else{
        // creamos un parrafo dentro del contendor carrito
        contendorCarrito.innerHTML = "<p>¡Vaya! Tu inventario está vacío. Date una vuelta por Novedades y equípate para la siguiente misión!</p>"
    }
    // mostramos total a pagar 
    totalCompra.innerText = `Total de su compra: ${sumaTotal} €`
};

function cargarProductos(){
    // guardamos en una variable la direccion de la api con un limite de 20 productos
    let url = "https://api.escuelajs.co/api/v1/products?offset=0&limit=20"

    // hacemos la peticion a la api escuela js
    fetch(url)

    // convertimos la respuesta a json
    .then( respuesta => {
        return respuesta.json()
    })
    // una vez traducido recorremos cada producro que hemos traido
    .then( respuestaProcesada => {
        respuestaProcesada.forEach( productoNovedad => {
            // para cada producto creamos un div y le añadimos la clase
            let divNovedad = document.createElement("div")

            divNovedad.classList.add("novedad-producto");
            
            // le creamos el html y mostramos solo los primeros 100 caracteres seguido de puntos suspensivos de la descripcion
            divNovedad.innerHTML = `
                <div class="imagen-novedades">
                    <img src="${productoNovedad.images[0]}">   
                </div>
                <h3>${productoNovedad.title}</h3>
                <p>${productoNovedad.description.substring(0, 100)}...</p>
                <p>${productoNovedad.price} €</p>
                <button class="btn-carrito">Añadir al carrito</button>`
            
                const botonIndividual = divNovedad.querySelector(".btn-carrito");

                // al hacer click en añadir al carrito añadimos el producto a la lista 
                botonIndividual.addEventListener("click", () => {
                    listaCarrito.push(productoNovedad);
                });
        
            // añadimos el producto al DOM
            novedades.appendChild(divNovedad);
        })
    })
}
// llamamos a la funcion
cargarProductos()

// espera click en el carrito para abrir la modal
botonCarrito.addEventListener("click", () => {
    modalCarrito.classList.add("visible")
    mostrarCarrito()
})

// espera el click en el prefil apra abrir la modal 
botonPerfil.addEventListener("click", () => {
    modalPerfil.classList.add("visible");
})

// espera el click en los botones de cierre para cerrar las modales
botonesCerrarModal.forEach(boton => {
    boton.addEventListener("click", () => {
        modalCarrito.classList.remove("visible")
        modalPerfil.classList.remove("visible")
    })
})

// espera click en el boton hamburguesa para abrir o cerrar el menu lateral
botonHamburguesa.addEventListener("click", () => {
    menuLateral.classList.toggle("visible")
})

// espera el submit del formulario
formPerfil.addEventListener("submit", e => {
    // evita que se recargue la pagina
    e.preventDefault()
    inputsFormulario.forEach(input => {
        // deja en blanco los inputs
        input.value = ""
    })
    // aparece el texto de cuenta creada con exito
    textoCuentaCreada.classList.add("visible")
})

// escuchamos el submit del input de la newsletter
formNewsletter.addEventListener("submit", e => {
    // impedimos que se recargue la pagina
    e.preventDefault()
    // mostramos el p de exito
    textoNewsletter.classList.add("visible")

    // vaciamos el input
    inputNewsletter.value = ""
})

// esperamos el input del buscador
inputBuscador.addEventListener("input", () => {
    // convertimos el input a minuscula
    let textoUsuario = inputBuscador.value.toLowerCase()

    // seleccionamos todos lso prouctos que nos habiamos traido de la api
    let productosNovedad = document.querySelectorAll(".novedad-producto")

    // recorremos cada producto
    productosNovedad.forEach( producto => {
        // seleccionamos el titulo del producto y los convertimos a minus
        let tituloProducto = producto.querySelector("h3").innerText.toLowerCase()

        // si el input del usuario coincide con el titulo del producto se muestra, sino se oculta
        tituloProducto.includes(textoUsuario) ? producto.style.display = "flex" : producto.style.display = "none"
    })
})