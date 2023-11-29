const carrito=document.querySelector('#carrito');
const ElementosCarrito=document.querySelector('#lista-carrito tbody');
const listaCurso=document.querySelector('#lista-cursos');
const btnVaciarCarrito=document.querySelector('#vaciar-carrito');
let carritoData=[];

ListadoDeEventos()
function ListadoDeEventos(){
    //agragar curso al carrito
    listaCurso.addEventListener('click',agregarCurso);
    //Elimina cursos del carrito
    carrito.addEventListener('click',eliminaCurso);
    //vaciar Carrito
    btnVaciarCarrito.addEventListener('click',()=>{
        carritoData=[];
        limpiarCarrito();
    });
}

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSelect=e.target.parentElement.parentElement
        getinfoCourse(cursoSelect);
    }
}

//Elimina un curso del carrito
function eliminaCurso(e){
    
    if(e.target.classList.contains('borrar-curso')){
        const cursoid=e.target.getAttribute('data-id'); 
        //verificar si existe mas de un curso para eliminar
        if( carritoData.find(course=>course.cantidad>1)){
            const cursos=carritoData.map(course=>{
                if(course.id===cursoid){
                    //disminuye la cantidad de articulos en el carrito
                   course.cantidad--;
                   return course; //retorna los objetos actualizados 
                }else{
                    return course;//retorna los datos sin actualizar 
                }
           });
           carritoData=[...cursos]; 
        }else{
        //Elimina del carrito 
        carritoData=carritoData.filter(course=> course.id!==cursoid);
        }
        pintarCarrito();
    }

}

//leer y extre datos del curso
function getinfoCourse(course){
    //console.log(course);

    const infocourse={
        Image:course.querySelector('img').src,
        titulo:course.querySelector('h4').textContent,
        precio:course.querySelector('span').textContent,
        id:course.querySelector('a').getAttribute('data-id'),
        cantidad:1,
    }
    //si un elemento existe en el carrito aumenta la cantidad
    const duplicados=carritoData.some(course => course.id===infocourse.id);
    if(duplicados){
        const cursos=carritoData.map(course=>{
             if(course.id===infocourse.id){
                course.cantidad++;
                return course; //retorna los objetos actualizados 
             }else{
                return course; //retorna los objetos no duplicados 
             }
        });
        carritoData=[...cursos];
    }else{
        carritoData=[...carritoData,infocourse];
    }
    //console.log(infocourse);
    //agrega los datos al carrito
    console.log(carritoData);
    pintarCarrito();
}

//mostarar el carrito en pantalla
function pintarCarrito(){
    //limpia el carrito previo al agregar un nuevo elemento
    limpiarCarrito();

    //muestra todos los elementos en el carrito sin duplicados 
    carritoData.forEach(course=>{
        const {Image, titulo, precio, cantidad, id}=course;
        const row=document.createElement('tr');
        row.innerHTML=`
        <td>
            <img src="${Image}" width="100">
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}">X</a>
        </td>
        `;

        //agragar en la tabla del carrito
        ElementosCarrito.appendChild(row);
    });
}

function limpiarCarrito(){
    //forma lenta
    //ElementosCarrito.innerHTML='';
    //forma rapida
    while(ElementosCarrito.firstChild){
        ElementosCarrito.removeChild(ElementosCarrito.firstChild);
    }
}