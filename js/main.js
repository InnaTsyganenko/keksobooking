function getRandomInt(min, max) { // Источник MDN
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max) {
    let temp = min;
    min = max;
    max = temp;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max, precision) {
  if (min > max) {
    let temp = min;
    min = max;
    max = temp;
  }
  return ((Math.random() * (max - min)) + min).toPrecision(precision + 1);
}
