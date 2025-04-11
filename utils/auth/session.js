export const getSession = async () => {
  try {
    const response = await fetch('/api/session')
    const data = await response.json()

    return data
  } catch (error) {
    console.error(error)
  }

  return null
}

export const refresh = async (baseURL) => {
  try {
    const response = await fetch((baseURL || '') + '/api/refresh_token')
    const data = await response.json()

    return data
    // return { success: true }
  } catch (error) {
    console.error(error)
  }

  return null
}