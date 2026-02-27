// Demo for iteration 3: clean cart with Strategy, Observer, Builder

import {
  NoDiscountStrategy,
  PercentageDiscountStrategy,
  ThresholdDiscountStrategy,
} from "./patterns/discountStrategies.js";
import { PriceNotifier } from "./patterns/priceObserver.js";
import { ProductBuilder } from "./patterns/productBuilder.js";
import { Cart } from "./core/cart.js";
import { ProductCatalog } from "./core/catalog.js";
import { User } from "./core/user.js";

const priceNotifier = new PriceNotifier();
const catalog = new ProductCatalog({ priceNotifier });

const alice = new User("Alice");
const bob = new User("Bob");
priceNotifier.subscribe(alice);
priceNotifier.subscribe(bob);

const builder = new ProductBuilder();
const laptop = builder
  .setName("Laptop")
  .setBasePrice(3000)
  .setCategory("electronics")
  .setMetadata({ brand: "BrandX" })
  .build();

const mouse = builder
  .setName("Mouse")
  .setBasePrice(50)
  .setCategory("accessories")
  .build();

catalog.addProduct(laptop);
catalog.addProduct(mouse);

// Cart using a threshold discount strategy
const discountStrategy = new ThresholdDiscountStrategy(500, 10); // 10% off if total >= 500
const cart = new Cart({ discountStrategy });

cart.addItem(laptop, 1);
cart.addItem(mouse, 2);

console.log("Cart items:");
for (const item of cart.getItems()) {
  console.log(
    `- ${item.product.name} x${item.quantity} @ ${item.product.basePrice} TND`,
  );
}
console.log("Total before discount:", cart.getTotalBeforeDiscount(), "TND");
console.log("Total after discount:", cart.getTotal(), "TND");

// Simulate a price drop
catalog.updatePrice(laptop.id, 2500);

console.log("\\nNotifications:");
console.log("Alice:", alice.notifications);
console.log("Bob:", bob.notifications);

