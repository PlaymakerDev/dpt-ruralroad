import { serialize, parse, CookieSerializeOptions } from 'cookie'

const TOKEN_NAME = 'vis-auth'

export const MAX_AGE = 60 * 20

export function setTokenCookie(
  res,
  token, _MAX_AGE = MAX_AGE) {
  const opt = {
    maxAge: _MAX_AGE,
    expires: new Date(Date.now() + _MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.SECURE_COOKIE === "TRUE",
    path: '/',
    sameSite: 'lax',
  }
  const cookie = serialize(TOKEN_NAME, token, opt)
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
