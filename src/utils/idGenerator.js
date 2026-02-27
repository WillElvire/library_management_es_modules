// Simple reusable ID generator utility (strategy-agnostic).
let counter = 0;

export function generateId(prefix = "id") {
  counter += 1;
  return `${prefix}-${counter}`;
}

