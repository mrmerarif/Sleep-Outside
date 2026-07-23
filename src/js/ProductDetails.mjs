import { setLocalStorage, getLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cart = getLocalStorage('so-cart') || [];
    cart.push(this.product);
    setLocalStorage('so-cart', cart);
  }

  renderProductDetails() {
    const productSection = document.querySelector('.product-detail');

    const brandName = this.product.Brand || "";
    const productName = this.product.Name;
    const imageSrc = this.product.Images.PrimaryLarge;
    const price = this.product.FinalPrice;
    const color = this.product.Colors?.[0]?.ColorName || "";
    const description = this.product.DescriptionHtmlSimple;

    productSection.innerHTML = `
      <h3>${brandName}</h3>
      <h2 class="divider">${productName}</h2>
      <img class="divider" src="${imageSrc}" alt="${productName}" />
      <p class="product-card__price">$${price}</p>
      <p class="product__color">${color}</p>
      <p class="product__description">${description}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    `;
  }
}
