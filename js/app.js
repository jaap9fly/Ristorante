const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnEnsalada = document.querySelector('.ensaladas');
const btnPizza = document.querySelector('.pizzas');
const btnPasta = document.querySelector('.pastas');
const btnPostres = document.querySelector('.postres');
const contenedorPlatillos= document.querySelector('.platillos');
let menues= document.getElementById("nav");
var menu_visible=false;

document.addEventListener('DOMContentLoaded', ()=>{
    eventos();
    platillos();
});

const eventos = () =>{
    menu.addEventListener('click', abrirMenu);
}

const abrirMenu = () =>{
    navegacion.classList.remove('ocultar');
    botonCerrar();
}

const botonCerrar = () => {
    const btnCerrar = document.createElement('p');
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent= 'x';
    btnCerrar.classList.add('btn-cerrar');
    //while(navegacion.children[5]){
    //    navegacion.removeChild(navegacion.children[5])
   // }
    navegacion.appendChild(btnCerrar);
    cerrarMenu(btnCerrar, overlay);
}

const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const imagen = entry.target;
            imagen.src = imagen.dataset.src
            observer.unobserve(imagen)
        }
    })
})

imagenes.forEach(imagen=>{

    observer.observe(imagen)
});

const cerrarMenu = (boton, overlay) =>{
    boton.addEventListener('click', ()=>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function() {
        overlay.remove();
        navegacion.classList.add('ocultar');
        boton.remove();
    }
}

const platillos = () =>{
    let platillosArray = [];
    const platillos = document.querySelectorAll('.platillo');
    
    platillos.forEach(platillo=> platillosArray = [...platillosArray, platillo])
    
    const ensaladas = platillosArray.filter(ensalada=> ensalada.getAttribute('data-platillo')==='ensalada');

    const pastas = platillosArray.filter(pasta=> pasta.getAttribute('data-platillo')==='pasta');

    const pizzas = platillosArray.filter(pizza=> pizza.getAttribute('data-platillo')==='pizza');
    
    const postres = platillosArray.filter(postre=> postre.getAttribute('data-platillo')==='postre');
    console.log(postres);

    mostrarPlatillos(ensaladas, pastas, pizzas, postres, platillosArray);
    
}

const mostrarPlatillos = (ensaladas, pastas, pizzas, postres, todos) =>{
    btnEnsalada.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        ensaladas.forEach(ensalada=> contenedorPlatillos.appendChild(ensalada));
    });
    btnPasta.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        pastas.forEach(pasta=> contenedorPlatillos.appendChild(pasta));
    });
    btnPizza.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        pizzas.forEach(pizza=> contenedorPlatillos.appendChild(pizza));
    });
    btnPostres.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        postres.forEach(postre=> contenedorPlatillos.appendChild(postre));
    });
    btnTodos.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        todos.forEach(todo=> contenedorPlatillos.appendChild(todo));
    })
}

const limpiarHtml=(contenedor)=>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild)
    }
}

