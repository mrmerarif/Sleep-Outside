// ProductDetails.mjs
// This module dynamically renders a product detail page and handles Add to Cart functionality.

import { setLocalStorage, getLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {}; // will store the product data once loaded
  }

  // Main initializer
  async init() {
    // 1. Fetch product details using ProductData.findProductById
    this.product = await this.dataSource.findProductById(this.productId);

    // 2. Render the product detail HTML
    this.renderProductDetails();

    // 3. Add event listener to Add to Cart button
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  // Add product to cart (moved from product.js)
  addProductToCart() {
    const cart = getLocalStorage('so-cart') || [];
    cart.push(this.product);
    setLocalStorage('so-cart', cart);
  }

  // Render the product detail page dynamically
  renderProductDetails() {
    // Select the product-detail section
    const productSection = document.querySelector('.product-detail');

    // Extract JSON fields safely
    const brandName = this.product.Brand?.Name || "";
    const productName = this.product.NameWithoutBrand || this.product.Name;
    const imageSrc = this.product.Image;
    const price = this.product.FinalPrice;
    const color = this.product.Colors?.[0]?.ColorName || "";
    const description = this.product.DescriptionHtmlSimple;

    // Replace its contents with dynamic HTML
    productSection.innerHTML = `
      <h3>${brandName}</h3>

      <h2 class="divider">${productName}</h2>

      <img
        class="divider"
        src="${imageSrc}"
        alt="${productName}"
      />

      <p class="product-card__price">$${price}</p>

      <p class="product__color">${color}</p>

      <p class="product__description">
        ${description}
      </p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    `;
  }
}
