import ProductData from './ProductData.mjs';
import { setLocalStorage } from './utils.mjs';

const dataSource = new ProductData('tents');

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

function addProductToCart(product) {
  const cart = JSON.parse(localStorage.getItem('so-cart')) || [];
  cart.push(product);
  setLocalStorage('so-cart', cart);
}

async function renderProductDetails() {
  const productId = new URLSearchParams(window.location.search).get('product');
  const product = await dataSource.findProductById(productId);

  document.querySelector('.product-detail').innerHTML = `
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img class="divider" src="${product.Image}" alt="${product.Name}" />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  `;

  document
    .getElementById('addToCart')
    .addEventListener('click', addToCartHandler);
}

renderProductDetails();
