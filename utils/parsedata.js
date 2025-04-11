export const parseData = (data) => {
  const parseNumber = Number(data)

  return isNaN(parseNumber) ? data : parseNumber
}