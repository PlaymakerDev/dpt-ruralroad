import { serialize, parse, CookieSerializeOptions } from 'cookie'

// const TOKEN_NAME = 'ergo-agent-auth'
const TOKEN_NAME = 'vis-auth'

export const MAX_AGE = 60 * 60 * 24

export function setTokenCookie(
  res,
  token, 
  _MAX_AGE = MAX_AGE) {
  const opt = {
    maxAge: Math.floor(_MAX_AGE),
    expires: new Date(Date.now() + Math.floor(_MAX_AGE) * 1000),
    httpOnly: true,
    secure: false, // ไม่ใช้ secure เพื่อให้ทำงานได้ใน localhost
    path: '/',
    sameSite: 'lax', // ใช้ lax เพื่อให้ทำงานได้ใน localhost
  }
  const cookie = serialize(TOKEN_NAME, token, opt)
  console.log('Setting cookie:', TOKEN_NAME)
  console.log('Cookie options:', JSON.stringify(opt))
  res.setHeader('Set-Cookie', cookie)
}

export function removeTokenCookie(res) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  })

  res.setHeader('Set-Cookie', cookie)
}

export function parseCookies(req) {
  // For API Routes we don't need to parse the cookies.
  if (req?.cookies) return req.cookies

  // For pages we do need to parse the cookies.
  const cookie = req?.headers?.cookie
  return parse(cookie || '')
}

export function getTokenCookie(req) {
  const cookies = parseCookies(req)
  return cookies[TOKEN_NAME]
}
