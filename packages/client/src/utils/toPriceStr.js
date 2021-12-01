export default (price) => {
  const chars = price.toString().split('').reverse()
  let priceStrArr = [];
  let tmp = '';
  let counter = 0
  for (const c of chars) {
    tmp = c + tmp;
    if (counter === 2) {
      priceStrArr = [tmp].concat(priceStrArr);
      tmp = '';
      counter = 0;
    }
    counter++;
  }
  if (tmp) {
    priceStrArr = [tmp].concat(priceStrArr);
  }
  return priceStrArr.join(',');
}
