module.exports = (price) => {
  const recur = (price) => {
    if (price >= 1000) {
      recur(Math.floor(price / 1000));
    }
    const n = price % 1000
    if (n !== (n | 0)) {
      priceStrArr.push(`${(n).toFixed(2)}`);
    } else {
      priceStrArr.push(`${n}`);
    }
  }
  let priceStrArr = [];
  recur(price)
  return priceStrArr.join(',')
}
