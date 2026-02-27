// Builder Pattern for flexible Product creation

export class Product {
  constructor({ id, name, basePrice, category, metadata }) {
    this.id = id;
    this.name = name;
    this.basePrice = basePrice;
    this.category = category || "general";
    this.metadata = metadata || {};
  }
}

let nextId = 1;

export class ProductBuilder {
  constructor() {
    this.reset();
  }

  reset() {
    this._name = "";
    this._basePrice = 0;
    this._category = "general";
    this._metadata = {};
    return this;
  }

  setName(name) {
    this._name = name;
    return this;
  }

  setBasePrice(price) {
    this._basePrice = price;
    return this;
  }

  setCategory(category) {
    this._category = category;
    return this;
  }

  setMetadata(metadata) {
    this._metadata = { ...metadata };
    return this;
  }

  build() {
    const product = new Product({
      id: `p-${nextId++}`,
      name: this._name,
      basePrice: this._basePrice,
      category: this._category,
      metadata: this._metadata,
    });
    this.reset();
    return product;
  }
}

