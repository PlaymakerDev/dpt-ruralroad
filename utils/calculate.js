const Big = require('big.js')

/**
 * *
 * @param {Number} a
 * @param {Number} b
 * @returns {String} result a * b
 */
const mul = (a, b, decimal = 2) => {
  const _a = Number(a)
  const _b = Number(b)

  const x = new Big(_a)
  const result = decimal === 'none' ? x.mul(_b) : x.mul(_b).toFixed(decimal)
  return Number(result)
}

/**
 * /
 * @param {Number} a
 * @param {Number} b
 * @returns {String} result a / b
 */
const div = (a, b, decimal = 2) => {
  const _a = Number(a)
  const _b = Number(b)

  const x = new Big(_a)
  const result = decimal === 'none' ? x.div(_b) : x.div(_b).toFixed(decimal)
  return Number(result)
}

/**
 * +
 * @param {Number} a
 * @param {Number} b
 * @returns {String} result a + b
 */
const plus = (a, b, decimal = 2) => {
  const _a = Number(a)
  const _b = Number(b)

  const x = new Big(_a)
  const result = decimal === 'none' ? x.plus(_b) : x.plus(_b).toFixed(decimal)
  return Number(result)
}

/**
 * -
 * @param {Number} a
 * @param {Number} b
 * @returns {String} result a - b
 */
const minus = (a, b, decimal = 2) => {
  const _a = Number(a)
  const _b = Number(b)

  const x = new Big(_a)
  const result = decimal === 'none' ? x.minus(_b) : x.minus(_b).toFixed(decimal)
  return Number(result)
}

module.exports = {
  mul,
  div,
  plus,
  minus
}
