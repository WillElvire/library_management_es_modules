// Part 2: Refactored shopping cart using the Module Pattern
// Encapsulates cart state inside a closure to avoid global scope pollution.

const CartModule = (function () {
  const items = [];

  function addItem(name, quantity, price) {
    if (!name || quantity <= 0 || price < 0) {
      console.log("Invalid item data.");
      return;
    }
    items.push({ name, quantity, price });
  }

  function removeItem(name) {
    const index = items.findIndex((item) => item.name === name);
    if (index === -1) {
      console.log(`Item "${name}" not found in cart.`);
      return;
    }
    items.splice(index, 1);
  }

  function clearCart() {
    items.length = 0;
  }

  function getItems() {
    return items.map((item) => ({ ...item }));
  }

  function getTotal() {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }

  function viewCart() {
    if (items.length === 0) {
      console.log("Cart is empty.");
      return;
    }

    for (const item of items) {
      const subtotal = item.quantity * item.price;
      console.log(
        `${item.name} (x${item.quantity}) - ${subtotal.toFixed(2)} TND`,
      );
    }
    console.log(`Total: ${getTotal().toFixed(2)} TND`);
  }

  return {
    addItem,
    removeItem,
    clearCart,
    getItems,
    getTotal,
    viewCart,
  };
})();

// Example behavior (uncomment to run with `node moduleCart.js`)
if (require.main === module) {
  CartModule.addItem("Apple", 2, 1.5);
  CartModule.addItem("Orange", 3, 2.0);
  CartModule.viewCart();
  CartModule.removeItem("Apple");
  CartModule.viewCart();
  CartModule.clearCart();
  CartModule.viewCart();
}

module.exports = CartModule;

