/*

TRABAJO PRACTICO FINAL: ITUNES

En el siguiente trabajo practico utilizaremos la api de iTunes para traer información de albums de musica.

Consignas:

HEADER:
- La página debe contar con un header con una imagen que al clickearla nos recargue la página.

BODY
- Debemos contar con un input en donde el usuario pueda ingresar las palabras para buscar albums de un artista.
- Tambien habrá un boton de "Buscar" o una lupa, el cual al presionarlo realizará nuestra busqueda de disco en la api de iTunes.
- Cuando estemos buscando, deberemos mostrar un icono de "Cargando resultados..." en la pagina, el cual desaparecera cuando aparezcan los resultados.
- Por cada resultado obtenido deberemos renderizar:
	- Nombre del Artista
	- Nombre del album
	- Imagen del album
	- Pais
	- Cantidad de canciones
	- Genero
	- Precio

FOOTER
- En el footer debemos tener informacion relevante con respecto al Alumno, año, links a redes sociales
- El footer tambien debe contar con un ancla que nos lleve hacia arriba de todo de la página.

BONUS: crear radio buttons que nos permitan elegir si lo que estamos buscando es una cancion o un album.
Tener en cuenta que se renderizaran de manera diferente.

URLS de ejemplo para hacer Ajax Requests:
https://itunes.apple.com/search?term=michael+jackson&entity=album
https://itunes.apple.com/search?term=queen&entity=album

Documentacion:
https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/#searchexamples
https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/#searching

*/


'use strict';

function renderizar (data){
  data.results.map(function (element,index){
    var li = document.createElement('li');
    var img = document.createElement('img');
    img.src = element.artworkUrl60;
    var artistShow = element.artistName;
    var albumShow = element.collectionName;
    var pais = element.country;
    var cantidad =  element.trackCount;
    var genero = element.primaryGenreName;
    var precio = element.collectionPrice;
    $(li).append(artistShow).append(albumShow).append(img).append(pais).append(cantidad).append(genero).append(precio);
    $('.showContent').append(li);
  });
}

$('#buscar').click(function(event){
  event.preventDefault();
  var over = document.querySelector('.overlay');
  $(over).show();
  var searchAr = document.getElementById('nombre-artista');
  var searchAl = document.getElementById('nombre-album');
  var artist = searchAr.value.replace(' ','+');
  var album = searchAl.value.replace(' ','+');

  $.ajax({
    type: 'GET',
    dataType: 'json',
    url:'https://itunes.apple.com/search?term='+artist+album+'&entity=album',
    success: function (data){
      //renderizar(data);
      console.log(data);
      renderizar (data);
      $(over).hide()

    },
    error: function (data){
      console.log("error");
    },
  });

})
