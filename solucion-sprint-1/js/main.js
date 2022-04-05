'use strict';

/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race');
const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMesage = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');
const GITHUB_USER = 'tanferest';
const kittenListStored = JSON.parse(localStorage.getItem('kittensList'));

//const SERVER_URL

//Objetos con cada gatito
// YA NO HACE FALTA - LOS GATITOS VIENEN DE LA API
/*const kittenData_1 = {
  image: 'https://ychef.files.bbci.co.uk/976x549/p07ryyyj.jpg',
  name: 'Anastacio',
  desc: 'Ruiseño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!',
  race: 'British Shorthair',
};
const kittenData_2 = {
  image:
    'https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2019_39/3021711/190923-cat-pet-stock-cs-1052a.jpg',
  name: 'Fiona',
  desc: 'Juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!',
  race: 'British Shorthair',
};
const kittenData_3 = {
  image:
    'https://images.emedicinehealth.com/images/article/main_image/cat-scratch-disease.jpg',
  name: 'Cielo',
  desc: 'Ruiseño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!',
  race: 'British Shorthair',
};*/

let kittenDataList = [];

//Funciones
function renderKitten(kittenData) {
  const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${kittenData.url}
        alt="gatito"
      />
      <h3 class="card_title">${kittenData.name}</h3>
      <h3 class="card_race">${kittenData.race}</h3>
      <p class="card_description">
      ${kittenData.desc}
      </p>
    </article>
    </li>`;
  return kitten;
}

function renderKittenList(kittenDataList) {
  listElement.innerHTML = '';
  for (const kittenItem of kittenDataList) {
    listElement.innerHTML += renderKitten(kittenItem);
  }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
  newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
  newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
  event.preventDefault();
  if (newFormElement.classList.contains('collapsed')) {
    showNewCatForm();
    labelMesage.innerHTML = '';
  } else {
    hideNewCatForm();
  }
}
//Adicionar nuevo gatito
function addNewKitten(event) {
  event.preventDefault();
  const valueDesc = inputDesc.value;
  const valuePhoto = inputPhoto.value;
  const valueName = inputName.value;
  const valueRace = inputRace.value;
  const newKittenDataObject = {
    photo: valuePhoto,
    name: valueName,
    race: valueRace,
    description: valueDesc,
  };
  if (valueDesc === '' && valuePhoto === '' && valueName === '') {
    labelMesage.innerHTML = 'Debe rellenar todos los valores';
  } else {
    if (valueDesc !== '' && valuePhoto !== '' && valueName !== '') {
      kittenDataList.push(newKittenDataObject);
      renderKittenList(kittenDataList);
      inputDesc.value = ``;
      inputPhoto.value = ``;
      inputName.value = ``;
      inputRace.value = ``;
      labelMesage.innerHTML = 'Mola! Un nuevo gatito en Adalab!';
    }
  }
}
//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
  event.preventDefault();
  newFormElement.classList.add('collapsed');
  inputDesc.value = '';
  inputPhoto.value = '';
  inputName.value = '';
}

//Filtrar por descripción
function filterKitten(event) {
  event.preventDefault();
  const descrSearchText = input_search_desc.value;
  listElement.innerHTML = '';
  for (const kittenItem of kittenDataList) {
    if (kittenItem.desc.toLowerCase().includes(descrSearchText.toLowerCase())) {
      listElement.innerHTML += renderKitten(kittenItem);
    }
  }
}

//Mostrar el litado de gatitos en ell HTML
renderKittenList(kittenDataList);

// Obtener listado de gatitos de la API
//function getKittenData()
//getKittenData();

//Eventos
linkNewFormElememt.addEventListener('click', handleClickNewCatForm);
searchButton.addEventListener('click', filterKitten /*getKittenData*/);
buttonAdd.addEventListener('click', addNewKitten);
buttonCancelForm.addEventListener('click', cancelNewKitten);

if (kittenListStored) {
  //si existe el listado de gatitos en el local storage
  // vuelve a pintar el listado de gatitos
  //...
  //completa el código...
} else {
  //sino existe el listado de gatitos en el local storage
  //haz la petición al servidor

  fetch(`https://adalab-api.herokuapp.com/api/kittens/${GITHUB_USER}`, {
    method: 'POST',
    body: JSON.stringify(kittenDataList),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((data) => {
      kittenDataList = data.results;
      console.log(data);
      renderKittenList(kittenDataList);
    });

  //guarda el listado obtenido en el local storage.
  //vuelve a pintar el listado de gatitos
  //completa el código...
}
