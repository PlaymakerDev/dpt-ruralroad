import Iron from '@hapi/iron'
import { MAX_AGE, setTokenCookie, getTokenCookie } from './authCookies'
import config from '@/config'
// import { User } from './user';
// import { GetServerSidePropsReq } from '../types/getServerSideProps';
import axios, { AxiosError } from 'axios'
import { compereDate } from '@/utils/hooks/useRefreshToken'

const TOKEN_SECRET = config.token_secret || 'this_is_a_very_long_and_secure_secret_key_for_iron_seal'

export async function setLoginSession(res, session, MAX_AGE) {
  const createdAt = Date.now()
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE }
  console.log('Sealing session object:', JSON.stringify(obj))
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults)
  console.log('Token created successfully')
  setTokenCookie(res, token, MAX_AGE)
  console.log('Token cookie set successfully')
}

export async function getLoginSession(req, res) {
  const token = getTokenCookie(req)
  let redirectPath = undefined

  if (!token) return [undefined, redirectPath]

  try {
    let session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults)

    // ลบการตรวจสอบ map_group_name ที่นี่ เพราะอาจทำให้ session ถูก reject โดยไม่จำเป็น
    // แทนที่จะ return undefined ให้ส่ง session กลับไปและให้ component ที่ใช้เป็นคนตรวจสอบเอง
    // if (!session.map_group_name) {
    //   console.warn('Session missing map_group_name, treating as invalid')
    //   return [undefined, '/login']
    // }

    if (!!res && compereDate(session.createdAt)) {
      session = await reSession(req, res)
      if (!session) {
        redirectPath = '/session-expired?from=server_site'
      }
    }

    return [session, redirectPath]
  } catch (error) {
    console.error('Error unsealing token:', error.message)
    console.error('Token:', token)
    console.error('TOKEN_SECRET:', TOKEN_SECRET ? 'exists' : 'missing')
    // ถ้าเกิดข้อผิดพลาดในการถอดรหัส token ให้ถือว่าไม่มี session
    return [undefined, '/login']
  }
}

export function getUserSession(dataSignIn) {
  const user = {
    ...(dataSignIn || {})
  }

  user.token = dataSignIn.access_token
  // delete user.token

  return user
}

export async function reSession(req, res) {
  try {
    const url = config.hostBackendServerSide + '/api/v1/auth/refresh_token'
    const [session] = await getLoginSession(req)
    const { data, status } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      }
    })

    // if (data?.success) {
    if (!!data?.access_token && !!data?.refresh_token) {
      // const user = getUserSession({ ...session, ...data?.response })
      const user = getUserSession({ ...session, ...data })
      await setLoginSession(res, user, 60 * 60 * 24 * 2)
      return user
    }

    return session
  } catch (error) {
    console.error(error)
  }

  return null
}
