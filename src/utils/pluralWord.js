/**
 * Transform word endings depending on quantity
 *
 * @param {number} number For wich number resolve word ending
 * @param {string} singular Example : банан
 * @param {string} imperative Example : банана
 * @param {string} subordinative Example : бананов
 * @return {string} word with correct ending
 */
 export function pluralWord(
  number,
  singular,
  imperative,
  subordinative,
) {
  const condition = number % 100;
  const condition2 = condition % 10;
  if (condition > 10 && condition < 20) return subordinative;
  if (condition2 > 1 && condition2 < 5) return imperative;
  if (condition2 === 1) return singular;
  return subordinative;
}