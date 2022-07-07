function randomN(max) {
  return Math.floor(Math.random() * max);
}

function getPercentage(weight) {
  console.log(`${weight % 100}`);
  return +`${weight % 100}`;
}
