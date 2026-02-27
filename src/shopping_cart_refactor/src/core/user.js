// Simple User class acting as an observer for price drops

export class User {
  constructor(name) {
    this.name = name;
    this.notifications = [];
  }

  onPriceDrop(product, oldPrice, newPrice) {
    const msg = `Hi ${this.name}, price dropped for ${product.name}: ${oldPrice.toFixed(
      2,
    )} -> ${newPrice.toFixed(2)} TND`;
    this.notifications.push(msg);
  }
}

