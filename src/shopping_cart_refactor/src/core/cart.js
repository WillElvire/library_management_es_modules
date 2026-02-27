// Iteration 3 - Cart using Strategy (discount), Observer (price drops), and Builder (products)

import { NoDiscountStrategy } from "../patterns/discountStrategies.js";

export class Cart {
  constructor({ discountStrategy = new NoDiscountStrategy() } = {}) {
    this.discountStrategy = discountStrategy;
    this.items = []; // { product, quantity }
  }

  addItem(product, quantity = 1) {
    if (!product || quantity <= 0) {
      throw new Error("Invalid product or quantity");
    }
    const existing = this.items.find((it) => it.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  removeItemById(productId) {
    this.items = this.items.filter((it) => it.product.id !== productId);
  }

  clear() {
    this.items = [];
  }

  getItems() {
    return this.items.map((it) => ({
      product: it.product,
      quantity: it.quantity,
    }));
  }

  getTotalBeforeDiscount() {
    return this.items.reduce(
      (sum, it) => sum + it.product.basePrice * it.quantity,
      0,
    );
  }

  getTotal() {
    const total = this.getTotalBeforeDiscount();
    return this.discountStrategy.calculate(total, this.items);
  }
}

