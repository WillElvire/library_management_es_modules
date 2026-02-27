// Iteration 2 - Refactored procedural shopping cart
// Cleaned up names, removed duplication, separated responsibilities.

const cart = [];

function addItem(name, quantity, price) {
  if (!name || quantity <= 0 || price < 0) {
    console.log("Invalid item data.");
    return;
  }
  cart.push({ name, quantity, price });
}

function calculateSubtotal(item) {
  return item.quantity * item.price;
}

function calculateTotal() {
  return cart.reduce((sum, item) => sum + calculateSubtotal(item), 0);
}

function printCart() {
  if (cart.length === 0) {
    console.log("Cart is empty.");
    return;
  }

  console.log("=== CART ===");
  cart.forEach((item) => {
    const subtotal = calculateSubtotal(item);
    console.log(
      `${item.name} (x${item.quantity}) - ${subtotal.toFixed(2)} TND`,
    );
  });
  console.log(`Total: ${calculateTotal().toFixed(2)} TND`);
}

function removeItemByName(name) {
  const index = cart.findIndex((item) => item.name === name);
  if (index === -1) {
    console.log(`Item "${name}" not found in cart.`);
    return;
  }
  cart.splice(index, 1);
}

function clearCart() {
  cart.length = 0; // keep reference stable
}

if (import.meta.url === `file://${process.argv[1]}`) {
  addItem("Apple", 2, 1.5);
  addItem("Orange", 3, 2.0);
  printCart();
  removeItemByName("Apple");
  printCart();
  clearCart();
  printCart();
}

