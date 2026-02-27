// Observer Pattern for price-drop notifications
// Observers must implement onPriceDrop(product, oldPrice, newPrice)

export class PriceNotifier {
  constructor() {
    this.observers = new Set();
  }

  subscribe(observer) {
    this.observers.add(observer);
  }

  unsubscribe(observer) {
    this.observers.delete(observer);
  }

  notify(product, oldPrice, newPrice) {
    for (const obs of this.observers) {
      if (typeof obs.onPriceDrop === "function") {
        obs.onPriceDrop(product, oldPrice, newPrice);
      }
    }
  }
}

