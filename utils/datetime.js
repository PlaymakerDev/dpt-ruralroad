import dayjs from "dayjs"

export const replaceTimezone = (value) => value.replace(/\+\d{2}:\d{2}/, '')
export const toRequest = (value, pushZ = false) => {
  if (!value) return null
  if (typeof value === 'string') return replaceTimezone(value)
  let result = replaceTimezone(value.format())
  if (!result) return null
  if (pushZ && result) result = result + 'Z'
  return result
}

export const toJSON = (value) => {
  if (!value) return null
  if (typeof value === 'string') return value
  let result = value.format()
  if (!result) return null
  return result
}

export const toMoment = (value) => {
  if (!value) return ''
  if (dayjs(value).isValid()) {
    return dayjs(value)
  }

  return ''
}

export const toJSONFormTo = (form, to) => {
  let from_date = toJSON(form) || ''
  let to_date = toJSON(to) || ''
  from_date = from_date.replace(/T\d{2}:\d{2}:\d{2}/, 'T00:00:00')
  to_date = to_date.replace(/T\d{2}:\d{2}:\d{2}/, 'T23:59:59')
  return { from_date, to_date }
}

export const generateDaysOfMonth = (month) => {
  const days = [];
  for (let i = 1; i <= month; i++) {
    days.push([i])
  }
  return days;
}