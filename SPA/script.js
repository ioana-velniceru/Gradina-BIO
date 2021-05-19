const body = document.getElementById('body');
const main = document.getElementById('main');
const formTitle = document.getElementById('formTitle');
const formQuality = document.getElementById('formQuality');
const formPrice = document.getElementById('formPrice');
const formProvider = document.getElementById('formProvider');
const formPlace = document.getElementById('formPlace');
const formImage = document.getElementById('formImage');
const formDescription = document.getElementById('formDescription');
let saveBtn = document.getElementById('save');
const cancelBtn = document.getElementById('cancel');
const aboutLink = document.getElementById('about_link');
const productsLink = document.getElementById('products_link');
const mainLink = document.getElementById('main_link');
const contactLink = document.getElementById('contact_link');
function getProductsFromServer(){
    fetch('http://localhost:3000/products')
        .then(function(response){
            response.json().then(function(products){
                renderProductsListPage(products);
            });
        });
};
function addProductToServer(){
    const postObject = {
        title: formTitle.value,
        quality: formQuality.value,
        price: formPrice.value,
        provider: formProvider.value,
        place: formPlace.value,
        image: formImage.value,
        description: formDescription.value
    };
    fetch('http://localhost:3000/products', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    }).then(function(){
        getProductsFromServer();
        resetForm();
        closeModal();
    });
}
function deleteProductFromServer(productID){
    fetch(`http://localhost:3000/products/${productID}`, {
        method: 'delete'
    }).then(function(){
        getProductsFromServer();
    });
}
function updateProductToServer(productID){
    const putObject = {
        title: formTitle.value,
        quality: formQuality.value,
        price: formPrice.value,
        provider: formProvider.value,
        place: formPlace.value,
        image: formImage.value,
        description: formDescription.value
    };
    fetch(`http://localhost:3000/products/${productID}`, {
        method: 'put',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
    }).then(function(){
        getProductsFromServer();
        resetForm();
        closeModal();
    });
}
function openAddModal(){
    clearSaveButtonEvents();
    saveBtn.addEventListener('click', function(){
        addProductToServer();
    });
    body.className = 'show-modal';
}
function openEditModal(product){
    formTitle.value = product.title;
    formQuality.value = product.quality;
    formPrice.value = product.price;
    formProvider.value = product.provider;
    formPlace.value = product.place;
    formImage.value = product.image;
    formDescription.value = product.description;
    clearSaveButtonEvents();
    saveBtn.addEventListener('click', function(){
        updateProductToServer(product.id);
    });
    body.className = 'show-modal';
}
function removeOldProducts(){
    while (main.firstChild){
        main.removeChild(main.firstChild);
    }
}
function createProductList(product){
    let productTitle = document.createElement('span');
    productTitle.className = "title_prod info_item";
    productTitle.textContent = product.title;
    let quality = document.createElement('span');
    quality.textContent = product.quality;
    let qualityContainer = document.createElement('div');
    qualityContainer.className = "quality info_item";
    qualityContainer.textContent = 'Calitate: ';
    qualityContainer.appendChild(quality);
    let price = document.createElement('span');
    price.className = "price info_item";
    price.textContent = product.price;
    let priceContainer = document.createElement('div');
    priceContainer.textContent = " lei/kg";
    price.appendChild(priceContainer);
    let provider = document.createElement('span');
    provider.textContent = product.provider;
    let providerContainer = document.createElement('div');
    providerContainer.className = "provider info_item";
    providerContainer.textContent = 'Producător: ';
    providerContainer.appendChild(provider);
    let place = document.createElement('span');
    place.textContent = product.place;
    let placeContainer = document.createElement('div');
    placeContainer.className = "place info_item";
    placeContainer.textContent = 'Proveniența: ';
    placeContainer.appendChild(place);
    let image = document.createElement('img');
    image.className = "image info_item";
    image.src = product.image;
    image.alt = "imagine";
    let description = document.createElement('p');
    description.className = "description info_item";
    description.textContent = product.description;
    let infoContainer = document.createElement('div');
    infoContainer.className = "info_container";
    infoContainer.appendChild(productTitle);
    infoContainer.appendChild(qualityContainer);
    infoContainer.appendChild(price);
    infoContainer.appendChild(providerContainer);
    infoContainer.appendChild(placeContainer);
    infoContainer.appendChild(description);
    infoContainer.appendChild(image);
    let editBtn = document.createElement('button');
    editBtn.className = "action_button";
    editBtn.addEventListener('click', function(){
        openEditModal(product);
    });
    editBtn.textContent = "Modificați";
    let deleteBtn = document.createElement('button');
    deleteBtn.className = "action_button";
    deleteBtn.addEventListener('click', function(){
        deleteProductFromServer(product.id);
    });
    deleteBtn.textContent = "Ștergeți";
    let buttonContainer = document.createElement('div');
    buttonContainer.className = "action_container";
    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);
    let productListNode = document.createElement('article');
    productListNode.appendChild(infoContainer);
    productListNode.appendChild(buttonContainer);
    return productListNode;
}
function createMainNode(){
    let intro = document.createElement('p');
    intro.className = "intro_text";
    intro.textContent = 'Fructe și legume direct de la Mama Natură.';
    let introContainer = document.createElement('section');
    introContainer.className = "intro_container";
    introContainer.appendChild(intro);
    let introImg = document.createElement('img');
    introImg.className = "intro_img";
    introImg.src = "https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
    let introContent = document.createElement('p');
    introContent.className = "intro_text";
    introContent.textContent = "Cu mai mulți nutrienți și un gust 100% natural, fără chimicale și modificări genetice, legumele și fructele bio sunt, cu certitudine, alegerea potrivită pentru dvs. Noi suntem asociația care vi le poate aduce acasă!";
    let introContainer2 = document.createElement('section');
    introContainer2.className = "intro_container";
    introContainer2.appendChild(introContent);
    let productListBtn = document.createElement('button');
    productListBtn.className = "button";
    productListBtn.textContent = 'Mergeți către lista de produse';
    productListBtn.addEventListener('click', function(){
        getProductsFromServer();
    });
    let productListBtnContainer = document.createElement('div');
    productListBtnContainer.className = "button_container";
    productListBtnContainer.appendChild(productListBtn);
    let mainNode = document.createElement('div');
    mainNode.appendChild(introContainer);
    mainNode.appendChild(introImg);
    mainNode.appendChild(introContainer2);
    mainNode.appendChild(productListBtnContainer);
    return mainNode;
}
function createAboutNode(){
    let title = document.createElement('h2');
    title.className = "title";
    title.textContent = 'Despre noi';
    let aboutText = document.createElement('p');
    aboutText.className = "desc_text";
    aboutText.textContent = 'Legumele din Grădina BIO respectă tradiția cultivării ecologice și ajung de la producătorii noștri direct la dvs., în siguranță, în cel mai scurt timp, păstrându-și prospețimea și vitaminele. Plantele sunt crescute fără substanțe chimice nocive (pesticide, azotați etc.), iar semințele sunt nemodificate genetic. Vă veți convinge că alimentele BIO au un gust mult mai bun, iar în timp veți observa că veți avea mai multă energie și o sănătate mult mai bună, deoarece fructele și legumele BIO sunt mai bogate în minerale și în vitamine și își păstrează calitățile nutritive pentru un timp mai îndelungat.';
    let aboutContainer = document.createElement('section');
    aboutContainer.className = "intro_container";
    aboutContainer.appendChild(aboutText);
    let aboutNode = document.createElement('div');
    aboutNode.appendChild(title);
    aboutNode.appendChild(aboutContainer);
    return aboutNode;
}
function createContactNode(){
    let title = document.createElement('h2');
    title.className = "title";
    title.textContent = 'Cum cumpăr?';
    let contact = document.createElement('p');
    contact.className = "desc_text";
    contact.textContent = 'Pentru comenzi, vă rugăm să ne contactați la numărul de telefon de mai jos sau la adresa de mail. Produsele vi se vor livra la domiciliu, după stabilirea în prealabil a datei și a orei de livrare, iar plata se va face atunci când produsele ajung la dvs. Pentru comenzi care depășesc 200 de lei, transportul este gratuit.';
    let contactContainer = document.createElement('section');
    contactContainer.className = "intro_container";
    contactContainer.appendChild(contact);
    let contactNode = document.createElement('div');
    contactNode.appendChild(title);
    contactNode.appendChild(contactContainer);
    return contactNode;
}
function renderProductsListPage(products){
    removeOldProducts();
    let productListTitle = document.createElement('h2');
    productListTitle.className = "title_prodlist";
    productListTitle.textContent = 'Lista de produse';
    main.appendChild(productListTitle);
    for (let i = 0; i < products.length; i++){
        let productNode = createProductList(products[i]);
        main.appendChild(productNode);
    }
    let addBtn = document.createElement('button');
    addBtn.className = "button";
    addBtn.addEventListener('click', function(){
        openAddModal();
    })
    addBtn.textContent = 'Adăugați produs';
    let addBtnContainer = document.createElement('div');
    addBtnContainer.className = "button_container";
    addBtnContainer.appendChild(addBtn);
    main.appendChild(addBtnContainer);
}
function renderMainPage(){
    removeOldProducts();
    let mainNode = createMainNode();
    main.appendChild(mainNode);
}
function renderAboutPage(){
    removeOldProducts();
    let aboutNode = createAboutNode();
    main.appendChild(aboutNode);
}
function renderContactPage(){
    removeOldProducts();
    let contactNode = createContactNode();
    main.appendChild(contactNode);
}
function resetForm(){
    formTitle.value = '';
    formQuality.value = '';
    formPrice.value = '';
    formProvider.value = '';
    formPlace.value = '';
    formImage.value = '';
    formDescription.value = '';
}
function clearSaveButtonEvents(){
    let newBtn = saveBtn.cloneNode(true);
    saveBtn.parentNode.replaceChild(newBtn, saveBtn);
    saveBtn = document.getElementById('save');
}
function closeModal(){
    body.className = '';
}
cancelBtn.addEventListener('click', closeModal);
aboutLink.addEventListener('click', renderAboutPage);
productsLink.addEventListener('click', getProductsFromServer);
mainLink.addEventListener('click', renderMainPage);
contactLink.addEventListener('click', renderContactPage);

renderMainPage();