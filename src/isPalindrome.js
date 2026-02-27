// Recursive palindrome checker
// A word is a palindrome if it reads the same left-to-right and right-to-left.

export function isPalindrome(word) {
  if (typeof word !== "string") {
    throw new TypeError("word must be a string");
  }

  // Normalize: remove spaces and lowercase (optional depending on requirements)
  const normalized = word.replace(/\s+/g, "").toLowerCase();

  return isPalindromeRecursive(normalized);
}

function isPalindromeRecursive(str) {
  // Stop condition: empty string or single character is a palindrome
  if (str.length <= 1) {
    return true;
  }

  // Compare first and last characters
  if (str[0] !== str[str.length - 1]) {
    return false;
  }

  // Recurse on the inner substring
  const inner = str.slice(1, -1);
  return isPalindromeRecursive(inner);
}

// Simple manual tests (can be removed or adapted to a test runner)
if (import.meta.url === `file://${process.argv[1]}`) {
  const samples = ["gag", "kayak", "php", "radar", "hello", "A man a plan a canal Panama"];
  for (const w of samples) {
    console.log(`${w} -> ${isPalindrome(w)}`);
  }
}

