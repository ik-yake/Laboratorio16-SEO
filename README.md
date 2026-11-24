# UrbanSpace

Laboratorio académico de Yefry Calderon. Sitio inmobiliario estático para explorar viviendas de diseño en Lima. La empresa, sus indicadores, las propiedades, sus precios y los datos comerciales son ficticios. Las fotografías son referencias visuales.

## Ejecutar localmente

Abre `index.html` en un navegador moderno. También puedes iniciar un servidor desde la carpeta UrbanSpace con `py -m http.server 8000` si ya tienes Python y visitar http://localhost:8000/. Todo el sitio funciona con HTML5, CSS3 y JavaScript Vanilla. No requiere npm, compilación, backend ni base de datos.

## Archivos

```text
UrbanSpace/
  index.html
  propiedades.html
  nosotros.html
  contacto.html
  css/styles.css
  css/interior.css
  js/catalog.js
  js/main.js
  img/favicon.svg
  img/hero.jpg
  img/preview.jpg
  img/propiedades/   (nueve fotografías JPG)
  robots.txt
  sitemap.xml
  README.md
```

## Recorrido

El buscador de inicio lleva distrito, tipo y presupuesto al catálogo mediante parámetros GET. Allí puedes combinar filtros y búsqueda por nombre, ordenar precios o restablecer la selección. Las fichas se abren en un diálogo que admite Escape. Al consultar una vivienda, el formulario recupera su identificador desde la URL. La validación es local y la confirmación es demostrativa. Los datos personales no se transmiten ni se almacenan.

## SEO y despliegue manual

Cada HTML incluye idioma es-PE, título, descripción y palabras clave propios, autor, directivas de indexación, URL canónica, Open Graph y Twitter Cards. La vista previa social compartida utiliza un JPEG de 1200 × 630 píxeles. El sitemap enumera las cuatro páginas con frecuencia, prioridad y fecha de modificación.

1. Crea manualmente un repositorio en GitHub, añade el contenido de esta carpeta en su raíz y sube tu primer commit.
2. En Vercel importa el repositorio. Selecciona **Other**, raíz **./**, sin comando de instalación ni compilación y sin directorio de salida personalizado. Publica cuando estés listo.
3. Copia la URL HTTPS asignada. Reemplaza la base temporal `https://MI-DOMINIO.vercel.app` por esa URL sin barra final en los cuatro HTML, robots.txt y sitemap.xml. Conserva los sufijos de página y de imagen. Actualiza lastmod de los HTML que modifiques. Comprueba los cambios y súbelos a la rama de producción.
4. Para demostrar CI/CD, cambia una frase visible, actualiza lastmod de la página, crea otro commit y haz push. En Deployments de Vercel compara el identificador del commit y el estado con el historial de GitHub. Abre producción y verifica la frase. Guarda capturas del commit, del despliegue y del resultado.
5. Abre /robots.txt en el dominio real y comprueba Allow: / y la URL absoluta del sitemap. Abre /sitemap.xml y verifica que el navegador reconoce el XML, que sus cuatro direcciones responden correctamente y que el dominio temporal ya no aparece.
6. Pega cada URL pública en https://metatags.io/ y comprueba título, descripción e imagen. Abre también /img/preview.jpg desde producción.

## Fotografías

Las fotografías se descargaron de Unsplash y se optimizaron localmente bajo la [licencia Unsplash](https://unsplash.com/license). La tarjeta social incorpora la fotografía de portada y una composición original de UrbanSpace.

- [img/hero.jpg](https://images.unsplash.com/photo-1600596542815-ffad4c1539a9)
- [img/propiedades/miraflores.jpg](https://images.unsplash.com/photo-1600607687920-4e2a09cf159d)
- [img/propiedades/san-isidro.jpg](https://images.unsplash.com/photo-1600047509782-20d39509f26d)
- [img/propiedades/barranco.jpg](https://images.unsplash.com/photo-1600210492486-724fe5c67fb0)
- [img/propiedades/surco.jpg](https://images.unsplash.com/photo-1600585154340-be6161a56a0c)
- [img/propiedades/la-molina.jpg](https://images.unsplash.com/photo-1512917774080-9991f1c4c750)
- [img/propiedades/penthouse.jpg](https://images.unsplash.com/photo-1600607687939-ce8a6c25118c)
- [img/propiedades/loft.jpg](https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea)
- [img/propiedades/jardin.jpg](https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3)
- [img/propiedades/terraza.jpg](https://images.unsplash.com/photo-1600607688969-a5bfcd646154)
