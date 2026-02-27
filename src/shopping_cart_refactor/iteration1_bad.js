// Iteration 1 - Intentionally messy procedural shopping cart
// Code smells: globals everywhere, duplication, poor naming, mixed concerns, magic numbers.

let arr = []; // global cart, unclear name

function a(n, q, p) { // bad name, no validation structure
  arr.push({ n: n, q: q, p: p, t: q * p }); // duplicate subtotal calc stored on object
}

function b() {
  // view cart but also calculates total in a confusing way
  console.log("=== CART ===");
  let s = 0;
  for (let i = 0; i < arr.length; i++) {
    const it = arr[i];
    console.log(
      it.n +
        " (x" +
        it.q +
        ") - " +
        (it.q * it.p).toFixed(2) + // recalculates subtotal
        " TND",
    );
    s = s + it.t; // uses t but also recalculated above
  }
  console.log("TOTAL is: " + s.toFixed(2) + " TND");
}

function c(n) {
  // remove item by name, no feedback, tight coupling to arr
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].n === n) {
      arr.splice(i, 1);
      break;
    }
  }
}

function d() {
  // clear cart
  arr = []; // reassigns global, breaking external references
}

// quick demo
if (import.meta.url === `file://${process.argv[1]}`) {
  a("Apple", 2, 1.5);
  a("Orange", 3, 2.0);
  b();
  c("Apple");
  b();
  d();
  b();
}

