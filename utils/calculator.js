/* eslint-disable eqeqeq */
import calc from './calculate'

const decimal = 4
const cal_vat = 0.07

/**
 * @param {Number} amount
 * @param {Number} rate is percent rate
 * @returns {String} result rate
 */
export const rate = (amount, rate) => {
  if (rate == '0' || amount == '0') return amount
  const _rate = calc.div(rate, 100, decimal)
  const result = calc.mul(amount, _rate, decimal)

  return result
}

/**
 * @param {Number | String} rate or type String from calculator
 * @returns {String} result vat
 */
export const vat = (rate) => {
  if (rate == '0') return '0'
  return calc.mul(rate, cal_vat, decimal)
}

/**
 * @param {Number} amount
 * @param {Number | String} rate or type String from calculator
 * @param {Number | String} vat or type String from calculator
 * @returns {String} result total_amount
 */
export const total_amount = (amount, rate, vat) => {
  if (amount == '0') return amount
  let result = calc.plus(amount, rate, decimal)
  result = calc.plus(result, vat, decimal)

  return result
}

/**
 * 
 * @param {number} index 
 * @param {number} page 
 * @param {number} per_page 
 * @param {number} total 
 * @param {"asc" | "desc"} order 
 * @returns 
 */
export const calculate_index = (index, page, per_page, total, order = 'ASC') => {
  const no = index + 1 + (Number(page) - 1) * Number(per_page);
  if (order === 'desc') {
    return total - no + 1;
  } else {
    return no;
  }
};