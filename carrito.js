let menu = document.querySelector(".menu_container")
let btn_menu = document.querySelector(".icon_menu")
let carrito = document.querySelector(".carrito_cotenido")
let btn_carrito = document.querySelectorAll(".icon-menu")
let btn_add = document.querySelector(".agregar_cantidad-product")
let btn_cantidad = document.querySelector(".agregar_product-carrito")
let img_carrito = document.querySelectorAll(".produc_img-vist")
let carrito_prodcutos = document.querySelector(".compras_productos")
let container_img = document.querySelector(".container_img-vistas")
let container_img_galery = document.querySelector(".container_img-galery")
let img_galeryVistas = document.querySelector(".img_gallery")
let btns_galery = document.querySelector(".container_gallery-vista")
let img_principal = document.querySelector(".produc_img")
let container_galery = document.querySelector(".container_gallery")
let close_galery = document.querySelector(".img-icon-close")
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

container_img.addEventListener("click", e => {
    let img = e.target.src
    if (img != undefined) {
        img_principal.src = img
    }
})

img_principal.addEventListener("click", () => {
    container_galery.classList.add("mostrar_galery")
    let img_galery = document.querySelector(".img_gallery")
    img_galery.src = img_principal.src
})

let windowWidth = window.innerWidth;
if (windowWidth <= 768) {
    let container_img_evento = document.querySelector(".container_product-img")
    container_img_evento.addEventListener("click", cambioImg)

    carrito.addEventListener("click", () => {
        carrito.classList.remove("mostrar")
    })
}

btns_galery.addEventListener("click", cambioImg)

function cambioImg(e) {
    let img_vistas_galery = document.querySelectorAll(".produc_img-gallery")
    if (windowWidth <= 768) {
        img_galeryVistas = document.querySelector(".produc_img")
    }
    let tam = img_vistas_galery.length
    let posicion = Array.from(img_vistas_galery).findIndex(img => img.src == img_galeryVistas.src)
    let cont = posicion
    console.log("posicion del elemento", posicion)
    let boton = e.target.classList[2] || e.target.classList[1]
    console.log(boton)
    if (boton == "previous" || boton == "previouss" && cont > 0) {
        cont--;
        img_galeryVistas.src = img_vistas_galery[cont].src
        document.querySelector(".next").classList.remove("ocultar-btn")
    } else if (boton == "next" || boton == "nexts" && cont < tam - 1) {
        cont++;
        img_galeryVistas.src = img_vistas_galery[cont].src
        document.querySelector(".previous").classList.remove("ocultar-btn")
    }
    if (cont == tam - 1) {
        document.querySelector(".next").classList.add("ocultar-btn")
    }
    if (cont == 0) {
        document.querySelector(".previous").classList.add("ocultar-btn")
    }
}

container_img_galery.addEventListener("click", e => {
    let img = e.target.src
    if (img != undefined) {
        img_galeryVistas.src = img
    }
})

close_galery.addEventListener("click", () => {
    container_galery.classList.remove("mostrar_galery")
})

carrito_prodcutos.addEventListener("click", eliminarProducto)

btn_cantidad.addEventListener("click", e => {
    let cantidad = parseInt(document.querySelector(".cantidad_disponible").textContent)
    let cant_dispo = parseInt(document.querySelector(".disponibles_cant").textContent)
    let elemento = e.target.classList[0]
    if (elemento == "quitar_product" && cantidad >= 1) {
        cantidad--;
    } if (elemento == "sumar_product" && cantidad < cant_dispo) {
        cantidad++
    }
    document.querySelector(".cantidad_disponible").innerHTML = cantidad;
})

document.addEventListener("DOMContentLoaded", () => {
    agregar = JSON.parse(localStorage.getItem("productos")) || [];
    agregrCarrito()
})

btn_add.addEventListener("click", (e) => {
    let img = img_carrito[0].src
    console.log(img)
    let padre = e.target.parentElement.parentElement;
    if (parseInt(padre.querySelector(".cantidad_disponible").textContent) == 0) {
        alert("elemento vacio")
    } else {
        crearCarrito(padre)
    }
    console.log("padre", padre)
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
        sumarDisponibles()
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
    restarDisponibles()
}

function sumarDisponibles() {
    agregar.forEach(eleme => {
        let { cantidad, id } = eleme
        let cant_dispo = parseInt(document.querySelector(".disponibles_cant").textContent)
        if (id == document.querySelector(".agregar_cantidad-product").getAttribute("data-id")) {
            cant_dispo += cantidad;
        }
        document.querySelector(".disponibles_cant").innerHTML = cant_dispo;
    })
}

function restarDisponibles() {
    agregar.forEach(eleme => {
        let { cantidad, id } = eleme
        let cant_dispo = parseInt(document.querySelector(".disponibles_cant").textContent)
        if (id == document.querySelector(".agregar_cantidad-product").getAttribute("data-id")) {
            cant_dispo -= cantidad;
        }
        document.querySelector(".disponibles_cant").innerHTML = cant_dispo;
    })
}

function limpieza() {
    carrito_prodcutos.innerHTML = ""
}

function guardar() {
    localStorage.setItem("productos", JSON.stringify(agregar))
}