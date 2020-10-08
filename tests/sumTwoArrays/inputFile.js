/**
 * Return the sum of two arrays as a number
 *
 * @example
 *    sum([1,2,3], [4]); // 10
 *
 * @param {number[]} a - Array of numbers.
 * @param {number[]} b - Array of numbers.
 * @returns {number} the sum arrays.
 */
function sumTwoArrays(a, b) {
  const bigArray = Math.abs(a.length - b.length);
  let result = 0;
  for (var i = 0; i <= bigArray; i++) {
    if(a[i]) result += a[i];
    if(b[i]) result += b[i];
  }
  return result;
}

module.exports = sumTwoArrays;
