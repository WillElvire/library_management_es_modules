import { PriceNotifier } from "../patterns/priceObserver.js";

// Product catalog collaborates with PriceNotifier to implement Observer for price drops.
export class ProductCatalog {
  constructor({ priceNotifier = new PriceNotifier() } = {}) {
    this.priceNotifier = priceNotifier;
    this.products = new Map(); // id -> product
  }

  addProduct(product) {
    this.products.set(product.id, product);
  }

  getProduct(id) {
    return this.products.get(id);
  }

  updatePrice(id, newPrice) {
    const product = this.products.get(id);
    if (!product) throw new Error(`Product ${id} not found`);
    const oldPrice = product.basePrice;
    product.basePrice = newPrice;
    if (newPrice < oldPrice) {
      this.priceNotifier.notify(product, oldPrice, newPrice);
    }
  }
}

