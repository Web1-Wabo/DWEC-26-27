import { closeSpinner, openSpinner } from "../lib/spinner.lib.js";
import { DummyService } from "../services/dummy-service.js";

await setup();

async function setup() {
    const token = retrieveToken();
    if (!token) {
        alert('No has iniciado sesión. Serás redirigido a la página de inicio.');
        window.location = './index.html';
    } // en el mundo real hay que ver si el token ha caducado

    // setupProductsButton();

    const categoryIds = extractCategoriesFromUrl();

    // Si no recibo categorías muestro todos los productos, en otro caso
    // muestro solo los productos de las categorías indicadas
    if (categoryIds) {
        try {
            openSpinner();
            for (const categoryId of categoryIds.split(',')) {
                const products = await (new DummyService()).retrieveProductsByCategory(token, categoryId);
                renderProducts(products);
            }
        } catch (error) {
            alert('Hay un problema al recuperar las categorías.');
        } finally {
            closeSpinner();
        }
    } else {

    }
}


function extractCategoriesFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const categories = params.get('categories');
    return categories;
}



function retrieveToken() {
    return window.localStorage.getItem('token-2026-11-18');
}

function renderProducts(products) {
    const nDiv = document.querySelector('#tDivProducts');

    for (const product of products) {
        const nCheckbox = nDiv.appendChild(document.createElement('input'));
        nCheckbox.type = 'checkbox';
        nCheckbox.value = product.id;
        nCheckbox.id = `tChk${product.id}`;

        const nLabel = nDiv.appendChild(document.createElement('label'));
        nLabel.setAttribute('for', `tChk${product.id}`);
        nLabel.textContent = product.title;

        nDiv.appendChild(document.createElement('br'));
    }
}

// function setupProductsButton() {
//     document.querySelector('#tButProducts').addEventListener('click', e => {
//         const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
//         let values = '';
//         for (const checkbox of checkboxes) {
//             values += checkbox.value + ',';
//         }

//         window.location = `./products.html?categories=${values.substring(0,values.length-1)}`;
//         window.localStorage.setItem('categories', values.substring(0,values.length-1));
//     });
// }