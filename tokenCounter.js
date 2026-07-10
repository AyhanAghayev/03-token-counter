// Token Counter - estimates how many tokens a piece of English text uses.

// Step 3: remove leading and trailing whitespace
function cleanText(text) {
  return text.trim();
}

console.log(cleanText("  Hello world  "));

// Step 4: split the text into an array of words
function splitIntoWords(text) {
  return text.split(" ");
}

console.log(splitIntoWords("The quick brown fox"));

// Step 5: drop the empty strings left behind by double spaces
function removeEmptyWords(words) {
  return words.filter(function (word) {
    return word !== "";
  });
}

const messy = splitIntoWords("Hello   world");
console.log(messy);
console.log(removeEmptyWords(messy));

// Step 6: about three quarters of a token per word, rounded up so we never undercount
function estimateTokens(words) {
  return Math.ceil(words.length * 0.75);
}

const words = ["The", "quick", "brown", "fox"];
console.log(estimateTokens(words));

// Step 7: run a raw string through every step in order
function countTokens(text) {
  const cleaned = cleanText(text);
  const wordList = splitIntoWords(cleaned);
  const filtered = removeEmptyWords(wordList);
  return estimateTokens(filtered);
}

console.log(countTokens("Hello"));
console.log(countTokens("Hello, world!"));
console.log(countTokens("The quick brown fox jumps over the lazy dog"));
console.log(countTokens("  I am learning JavaScript   today  "));

// Bonus: cost in USD for a given token count at a "per 1 million tokens" price
function estimateCost(tokenCount, pricePerMillion) {
  return (tokenCount / 1000000) * pricePerMillion;
}

// A 500 word email is roughly 375 tokens under the 0.75 rule.
const emailTokens = Math.ceil(500 * 0.75);

console.log(emailTokens);
console.log(estimateCost(emailTokens, 5.0));   // GPT-4o
console.log(estimateCost(emailTokens, 3.0));   // Claude 3.5 Sonnet
console.log(estimateCost(emailTokens, 3.5));   // Gemini 1.5 Pro
console.log(estimateCost(emailTokens, 0.9));   // Llama 3 70B
console.log(estimateCost(emailTokens, 4.0));   // Mistral Large

// Bonus: character count of the cleaned text
function characterCount(text) {
  return cleanText(text).length;
}

console.log(characterCount("  Hello world  "));

// Bonus: the 0.75 rule is tuned for English. Azerbaijani packs more meaning
// into each word with suffixes, so a real tokeniser splits those words into
// several tokens and this estimate comes out too low.
console.log(countTokens("I am going to school."));
console.log(countTokens("Mən məktəbə gedirəm."));
