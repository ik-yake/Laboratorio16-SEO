(() => {
  'use strict';
  // Inventario académico. Los precios se expresan en dólares estadounidenses.
  const listings = [
    ['miraflores','Ático Malecón','Miraflores','Departamento',385000,3,2,158,'Un comedor abierto conecta la cocina con una sala de doble altura.','La escalera separa la zona social de los dormitorios. Un escritorio junto al ventanal ofrece espacio para trabajar.','Comedor contemporáneo con escalera metálica y paneles de madera'],
    ['san-isidro','Casa del Olivar','San Isidro','Casa',765000,4,4,325,'Una terraza a nivel del jardín amplía la sala hacia el exterior.','El primer piso reúne cocina, comedor y estudio. La planta alta reserva cuatro dormitorios y una sala familiar.','Casa de dos pisos con fachada blanca y terraza de madera'],
    ['barranco','Estudio Sáenz Peña','Barranco','Departamento',245000,1,1,78,'Un estudio con ventanales altos y luz de tarde.','La sala permite integrar una biblioteca y una mesa de trabajo. La cocina aprovecha la planta abierta.','Sala luminosa con sillones, plantas y una galería de fotografías'],
    ['surco','Casa del Fresno','Surco','Casa',650000,4,3,288,'Dos volúmenes enmarcan un árbol y un jardín central.','La zona social se abre al césped con puertas correderas. Los dormitorios miran hacia la copa del árbol.','Casa iluminada al anochecer con árbol y jardín'],
    ['la-molina','Villa Los Sauces','La Molina','Casa',890000,5,4,410,'Una residencia abierta al sol con piscina y terraza continua.','El comedor exterior comparte acceso con la cocina. El dormitorio principal queda separado del ala de invitados.','Vivienda blanca con piscina y vegetación junto a la terraza'],
    ['penthouse','Penthouse Pardo','Miraflores','Penthouse',700000,3,3,238,'Una sala con frente acristalado recorre el nivel principal.','El comedor y la cocina comparten una sola planta. Un estudio independiente permite trabajar con privacidad.','Sala de tonos claros con chimenea y pared revestida de madera'],
    ['loft','Loft Grau','Barranco','Departamento',315000,2,2,112,'Un loft de planta abierta con escalera ligera.','El segundo dormitorio también admite un taller y queda separado de la zona social.','Sala con sofá gris, mesa baja y escalera abierta'],
    ['jardin','Casa Patio','La Molina','Casa',570000,3,3,245,'Dos cuerpos de madera se encuentran alrededor de un patio protegido.','La cocina y la sala comparten vistas al patio. Los dormitorios quedan retirados de la entrada.','Exterior contemporáneo de madera con acceso entre jardines'],
    ['terraza','Casa Terraza','San Isidro','Casa',695000,4,3,276,'Una terraza cubierta acompaña el jardín a lo largo de la fachada.','La sala y el comedor tienen acceso directo al jardín. El nivel superior cuenta con un estar familiar.','Casa de dos niveles con terraza acristalada y césped']
  ];
  const properties = listings.map(([slug,name,district,type,price,beds,baths,area,summary,detail,alt]) =>
    ({slug,name,district,type,price,beds,baths,area,summary,detail,alt}));
  window.urbanProperties = properties;
  const cards = document.querySelector('#cards');
  if (!cards) return;
  const form = document.querySelector('#filters');
  const count = document.querySelector('#count');
  const empty = document.querySelector('#empty');
  const money = value => 'US$ ' + new Intl.NumberFormat('es-PE').format(value);
  const normalize = value => String(value || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const photo = p => 'img/propiedades/' + p.slug + '.jpg';
  const specs = p => `<p class="card-specs">${p.beds} hab. · ${p.baths} baños · ${p.area} m²</p>`;

  function card(p) {
    return `<article class="card" data-slug="${p.slug}">
      <div class="card-media"><img src="${photo(p)}" width="960" height="720" loading="lazy" alt="${p.alt}"><span class="card-type">${p.type}</span></div>
      <div class="card-body"><p class="card-location">${p.district} · Lima</p>
      <h3>${p.name}</h3><p class="card-price">${money(p.price)}</p>${specs(p)}
      <p>${p.summary}</p><button type="button" data-details="${p.slug}" aria-label="Ver detalles de ${p.name}">Ver detalles <span aria-hidden="true">↗</span></button></div></article>`;
  }
  function matches(p, filters) {
    const range = p.price <= 400000 ? 'bajo' : p.price <= 700000 ? 'medio' : 'alto';
    return normalize(p.name).includes(normalize(filters.get('q')))
      && (!filters.get('distrito') || normalize(p.district) === normalize(filters.get('distrito')))
      && (!filters.get('tipo') || normalize(p.type) === normalize(filters.get('tipo')))
      && (!filters.get('precio') || range === filters.get('precio'));
  }
  function render() {
    let results = properties;
    if (cards.hasAttribute('data-featured')) {
      results = properties.slice(0,3);
    } else if (form) {
      const filters = new FormData(form);
      results = properties.filter(p => matches(p,filters));
      if (filters.get('orden') === 'asc') results.sort((a,b) => a.price - b.price);
      if (filters.get('orden') === 'desc') results.sort((a,b) => b.price - a.price);
    }
    cards.innerHTML = results.map(card).join('');
    if (count) count.textContent = results.length + (results.length === 1 ? ' propiedad' : ' propiedades');
    if (empty) empty.hidden = results.length > 0;
  }
  if (form && !cards.hasAttribute('data-featured')) {
    const query = new URLSearchParams(location.search);
    for (const key of ['q','distrito','tipo','precio','orden']) {
      const control = form.elements.namedItem(key);
      if (control && query.has(key)) control.value = query.get(key);
    }
    form.addEventListener('input',render);
    form.addEventListener('change',render);
    form.addEventListener('submit', event => {event.preventDefault(); render();});
    form.addEventListener('reset', () => setTimeout(render,0));
  }
  render();
  const dialog = document.createElement('dialog');
  dialog.className = 'property-dialog';
  dialog.setAttribute('aria-labelledby','detail-title');
  document.body.append(dialog);
  cards.addEventListener('click', event => {
    const button = event.target.closest('[data-details]');
    if (!button) return;
    const p = properties.find(item => item.slug === button.dataset.details);
    if (!p) return;
    dialog.innerHTML = `<button type="button" class="dialog-close" aria-label="Cerrar detalles" autofocus>×</button>
      <img width="960" height="720" src="${photo(p)}" alt="${p.alt}">
      <div class="dialog-body"><p class="card-location">${p.type} · ${p.district}, Lima</p>
      <h2 id="detail-title">${p.name}</h2><p class="card-price">${money(p.price)}</p>${specs(p)}
      <p>${p.summary} ${p.detail}</p><a class="btn" href="contacto.html?propiedad=${p.slug}">Consultar por esta propiedad</a></div>`;
    dialog.showModal();
  });
  dialog.addEventListener('click', event => {
    if (event.target.closest('.dialog-close')) dialog.close();
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
})();
