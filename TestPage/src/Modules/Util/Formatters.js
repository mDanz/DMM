export const formatDividenNumber = (dividend) => {

  return dividend < 1
    ? dividend.toFixed(7)
    : dividend.toPrecision(8);
}

export const formatPriceNumber = (price) => {
  return price < 1
    ? parseFloat(price.toFixed(4))
    : price > 10000
      ? parseFloat(price.toFixed(2))
      : parseFloat(price.toPrecision(5));
}
