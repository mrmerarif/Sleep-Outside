// product.js
// This module handles dynamic product detail page logic.
// It now uses ProductDetails.mjs to render and manage product data dynamically.

import { getParam } from './utils.mjs'; // helper to read URL parameters
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

// Create a data source for tents
const dataSource = new ProductData('tents');

// Get the product ID from the URL query string (?product=880RR)
const productId = getParam('product');

// Create a ProductDetails instance with the product ID and data source
const product = new ProductDetails(productId, dataSource);

// Initialize the product detail page
product.init();
