const grid = new Muuri('.grid', {
	layout: {
		rounding: false
	}
});

window.addEventListener('load', () => {//cuando cargue la ventana
	grid.refreshItems().layout();//refresque todos los elementos
	document.getElementById('grid').classList.add('imagenes-cargadas');//Mostrar

	//Filtarado por categoria
	// Agregamos los listener de los enlaces para filtrar por categoria.
	const enlaces = document.querySelectorAll('#categorias a');//accede a categorias
	enlaces.forEach((elemento) => {//recorremos el elemento de cada uno de los enlaces
		elemento.addEventListener('click', (evento) => {//cuando hagan click ejecutamos el evento
			evento.preventDefault();//evitar el comportamiento del navegador
			enlaces.forEach((enlace) => enlace.classList.remove('activo'));//por cada enlace accedemos a classlist y removemos el activo
			evento.target.classList.add('activo');//encontramos el elemento que le dimos click y le damos la clase de activo

			//FILTRADOR
			const categoria = evento.target.innerHTML.toLowerCase();//toma la categoria actual y la guardamos
			categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);//muestra solo los elementos de la categoria actual
			//si cateogira es igual a todos mostrara todos los elementos : le vamos a decir que haga el filtrado con la categoria actual
		});
	});

	// Agregamos el listener para la barra de busqueda
	document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {//accdemos a la barra que comprueba  la barra de busqueda 
		const busqueda = evento.target.value; //cada que escriba se ejecuta y empieza a buscar // por cada vez que el usuario escribe algo ejecutamos...
		grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
		//accedemos a cada uno de los items y devolvemos un dataset, que acceden a las etiquetas en incluimos la busqueda
		//por cada una de las imagenes va a verificar su eqtiqueta y su busqueda
	});

	// Agregamos listener para las imagenes
	const overlay = document.getElementById('overlay');//obtenemos el overlay y los guardamos
	document.querySelectorAll('.grid .item img').forEach((elemento) => {//accedemos a todos los elementos que son todas las imagenes que estan dentro de item y dentro de grid
		elemento.addEventListener('click', () => {//cuando de click ejecutamos
			const ruta = elemento.getAttribute('src');//obtenemos la ruta del elemento y tomamtos su atriuto SRC
			const descripcion = elemento.parentNode.parentNode.dataset.descripcion;//accdemos el elemento, y hacemos 2 saltos en parents, obtenemos data set y seleccionamos el de descripcion

			overlay.classList.add('activo');//
			document.querySelector('#overlay img').src = ruta;
			document.querySelector('#overlay .descripcion').innerHTML = descripcion;
		});
	});

	// Eventlistener del boton de cerrar
	document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
		overlay.classList.remove('activo');
	});

	// Eventlistener del overlay
	overlay.addEventListener('click', (evento) => {
		evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
	});
});
