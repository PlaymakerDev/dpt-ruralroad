import Iron from '@hapi/iron'
import { MAX_AGE, setTokenCookie, getTokenCookie } from './authCookies'
import config from '@/config'

const TOKEN_SECRET = config.token_secret || ''

export async function setLoginSession(res, session, MAX_AGE) {
  const createdAt = Date.now()
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE }
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults)
  
  setTokenCookie(res, token, MAX_AGE)
}

export async function getLoginSession(req) {
  const token = getTokenCookie(req)

  if (!token) return

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults)
  console.log('session----->>>>> 222',session);
  return session
}

export function getUserSession(dataSignIn) {
  const user = {
    ...dataSignIn
  }

  user.token = dataSignIn.access_token
  delete user.access_token

  return user
}
