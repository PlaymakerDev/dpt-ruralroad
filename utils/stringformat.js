
class StringFormat {
  value
  constructor(value) {
    this.value = !value && value !== 0 ? '' : value
  }

  normal(precision) {
    if (!this.value) return '0'
    if (typeof this.value === 'number') {
      this.value = this.value.toString()
    }
    if (precision) {
      this.value = this._toFixed(precision)
    }
    let [integerPart, decimalPart] = this.value.split('.');

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
  }
  
  _toFixed(precision) {
    if (!this.value) return '0'
    return (+(Math.round(+(this.value + 'e' + precision)) + 'e' + -precision)).toFixed(
      precision
    )
  }

  /**
   * _formater: string // '##-##-##'
   */
  formater(_formater) {
    let textFormated = _formater
    const strPainText = `${this.value}`

    for (const c of strPainText) {
      textFormated = textFormated.replace('#', c)
    }

    return textFormated
  }
}

const format = (value) => new StringFormat(value)

export default format
