import { renderListWithTemplate } from './utils.mjs';

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    this.updateTitle();
  }

  renderList(list) {
    const template = document.getElementById('product-card-template');
    renderListWithTemplate(template, this.listElement, list, this.prepareTemplate);
  }

  prepareTemplate(template, product) {
    template.querySelector('.card__brand').textContent = product.Brand;
    template.querySelector('.card__name').textContent = product.Name;
    template.querySelector('.product-card__price').textContent = `$${product.FinalPrice}`;
    template.querySelector('img').src = product.Images.PrimaryMedium;
    template.querySelector('a').href = `/product_pages/index.html?product=${product.Id}`;
    return template;
  }

  updateTitle() {
    const title = document.querySelector('.product-list-title');
    title.textContent = `Top Products: ${this.category}`;
  }
}
