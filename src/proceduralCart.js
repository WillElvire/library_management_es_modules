// Part 1: Procedural shopping cart (global state + functions)

// Global cart data
const cart = [];

function addItem(name, quantity, price) {
  if (!name || quantity <= 0 || price < 0) {
    console.log("Invalid item data.");
    return;
  }
  cart.push({ name, quantity, price });
}

function removeItem(name) {
  const index = cart.findIndex((item) => item.name === name);
  if (index === -1) {
    console.log(`Item "${name}" not found in cart.`);
    return;
  }
  cart.splice(index, 1);
}

function clearCart() {
  cart.length = 0;
}

function viewCart() {
  if (cart.length === 0) {
    console.log("Cart is empty.");
    return;
  }

  let total = 0;
  for (const item of cart) {
    const subtotal = item.quantity * item.price;
    total += subtotal;
    console.log(
      `${item.name} (x${item.quantity}) - ${subtotal.toFixed(2)} TND`,
    );
  }
  console.log(`Total: ${total.toFixed(2)} TND`);
}

// Example behavior (uncomment to run with `node proceduralCart.js`)
if (require.main === module) {
  addItem("Apple", 2, 1.5);
  addItem("Orange", 3, 2.0);
  viewCart();
  removeItem("Apple");
  viewCart();
  clearCart();
  viewCart();
}

// Exporting functions for potential testing
module.exports = {
  cart,
  addItem,
  removeItem,
  clearCart,
  viewCart,
};

