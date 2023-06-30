const IntlObj = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
  currency: 'rub',
});

const IntlObjWithoutStyle = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
  currency: 'rub',
});

/**
 * Price formatter
 * @param price
 * @returns formatted price in rub currency
 * @example formatPrice(1000000); //1 000 000₽
 */
export function formatPrice(price, noStyle) {
  return noStyle ? IntlObjWithoutStyle.format(price) : IntlObj.format(price);
}