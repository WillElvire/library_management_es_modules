## Shopping Cart Refactor – Summary Report

### What changed and why

**Iteration 1** started with an intentionally messy script (`iteration1_bad.js`): unclear names (`a`, `b`, `arr`), duplicated subtotal logic, global reassignment of the cart, and mixed responsibilities. This made it hard to understand, extend, or safely modify.  
**Iteration 2** (`iteration2_refactored.js`) applied basic refactoring techniques: better function and variable names, extraction of subtotal/total calculations, removal of duplication, and keeping a stable cart reference. The behavior stayed the same, but the code became easier to read and reason about.

In **Iteration 3**, the design was modularized and enhanced with patterns inside `src/`:

- `Cart` in `core/cart.js` uses a pluggable discount strategy (Strategy Pattern).
- `discountStrategies.js` provides `NoDiscountStrategy`, `PercentageDiscountStrategy`, and `ThresholdDiscountStrategy`.
- `Product`/`ProductBuilder` in `productBuilder.js` apply the Builder Pattern for flexible product creation.
- `PriceNotifier` and `ProductCatalog` implement the Observer Pattern for price-drop notifications to `User` objects.

### Clean code principles and patterns

Clean code principles guided each step: descriptive naming, single-responsibility functions, separation of concerns (cart vs catalog vs notifications), and avoidance of duplicated logic. The Strategy pattern removed conditional discount logic from the cart, the Observer decoupled price-change events from user notification logic, and the Builder encapsulated construction of complex `Product` instances. Together, these patterns improved testability, extensibility, and clarity compared to the original procedural script.

