let menu = document.querySelector(".menu_container")
let btn_menu = document.querySelector(".icon_menu")
let carrito = document.querySelector(".carrito_cotenido")
let btn_carrito = document.querySelectorAll(".icon-menu")
let img_carrito = document.querySelectorAll(".produc_img-vist")
let carrito_prodcutos = document.querySelector(".compras_productos")
let agregar = []

btn_menu.addEventListener("click", () => {
    menu.classList.toggle("mover_izq")
})

btn_carrito.forEach(e => {
    e.addEventListener("mouseover", () => {
        carrito.classList.add("mostrar")
    })
})

carrito.addEventListener("mouseleave", () => {
    carrito.classList.remove("mostrar")
})

carrito_prodcutos.addEventListener("click", eliminarProducto)

document.addEventListener("DOMContentLoaded", () => {
    agregar = JSON.parse(localStorage.getItem("productos")) || [];
    agregrCarrito()
})

function crearCarrito(productos) {
    console.log("productos", productos)
    let datos = {
        imagen: img_carrito[0].src,
        title: productos.querySelector(".title_product").textContent,
        precio: productos.querySelector(".precio_descuento").textContent,
        cantidad: parseInt(productos.querySelector(".cantidad_disponible").textContent),
        precioOriginal: productos.querySelector(".precio_original").textContent,
        id: productos.querySelector(".agregar_cantidad-product").getAttribute("data-id"),
    }
    if (agregar.some(productos => productos.id === datos.id)) {
        let aumentarContador = agregar.map(productos => {
            if (productos.id === datos.id) {
                productos.cantidad += datos.cantidad
                return productos;
            } else {
                return productos;
            }
        })
        agregar = [...aumentarContador]
    } else {
        agregar = [...agregar, datos]
    }
    console.log("agregar", agregar)
    agregrCarrito()
}

function eliminarProducto(e) {
    if (e.target.classList.contains("img_basura-dalate")) {
        let idCurso = e.target.getAttribute("data-id")
        agregar = agregar.filter(target => target.id !== idCurso)
        agregrCarrito()
    }
}

function agregrCarrito() {
    limpieza()
    console.log("si entro ala funcion")
    agregar.forEach(elementos => {
        let { imagen, title, precio, cantidad, precioOriginal, id } = elementos
        let div = document.createElement("div")
        div.classList.add("contenido_carrito")
        div.innerHTML = `
        <img src="${imagen}" class="img-carrito">
        <div class="contenido_carrito-data">
            <p class="title_carrito-product">${title}</p>
            <span class="precio_product-carrito">${precio}</span>
            <span class="cantidad_producto-carrito">x ${cantidad}</span>
            <spna class="precio_original-carrito"> ${precioOriginal}</span>
        </div>       
        <img src="./images/icon-delete.svg" class="img_basura-dalate" data-id="${id}">
        `
        carrito_prodcutos.appendChild(div)
    })
    guardar()

}

function limpieza() {
    carrito_prodcutos.innerHTML = ""
}

function guardar() {
    localStorage.setItem("productos", JSON.stringify(agregar))
}