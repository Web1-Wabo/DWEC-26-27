import { DummyService } from "../services/dummy.service.js";

await setup();

async function setup() {
    const token = checkToken();
    const categoryId = extractCategoryFromUrl();
    if (categoryId) {
        document.querySelector('#tH1Category').textContent = `Productos de la categoría ${categoryId}`;
        try {
            const products = await (new DummyService()).retrieveProductsByCategory(token, categoryId, 0, 5);
            renderProducts(products);
        } catch (error) {
            alert('Hay un problema: ' + error.message);
        }
    } else {

    }
}

function checkToken() {
    const encodedToken = window.localStorage.getItem('token-2026-11-24');

    if (!encodedToken) {
        alert('La sesión no es válida. Será enviado a la página de inicio');
        window.location = './index.html';
        return;
    }

    // Actualizamos la cabecera mostrando el nombre del usuario

    return encodedToken;
}

function extractCategoryFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    return category;
}

function renderProducts(products) {
    const nTbody = document.querySelector('#tTabProducts>tbody');

    products.forEach(product => {
        const nTr = nTbody.appendChild(document.createElement('tr'));

        const nTdTitle = nTr.appendChild(document.createElement('td'));
        nTdTitle.textContent = product.title;

        const nTdImage = nTr.appendChild(document.createElement('td'));
        const nImage = nTdImage.appendChild(document.createElement('img'));
        nImage.src = product.thumbnail;

        const nTdCheckbox = nTr.appendChild(document.createElement('td'));
        const nCheckbox = nTdCheckbox.appendChild(document.createElement('input'));
        nCheckbox.type = 'checkbox';
        nCheckbox.id = `tChk${product.id}`;
        nCheckbox.dataset.productId = product.id;

        nCheckbox.addEventListener('change', e => {
            const nCheckbox = e.target;
            const productId = parseInt(nCheckbox.dataset.productId);
            if (nCheckbox.checked) {
                let cart = JSON.parse(window.localStorage.getItem('cart'));
                if (!cart) cart = [];
                cart.push(productId);
                window.localStorage.setItem('cart', JSON.stringify(cart));
            }
        });
 
    });
}