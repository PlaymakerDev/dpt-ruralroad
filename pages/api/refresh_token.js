import axios, { AxiosError } from 'axios'
import { setLoginSession, getUserSession } from '@/utils/auth'
import { MAX_AGE } from '@/utils/auth/authCookies'
import config from '@/config'
import { getLoginSession } from '@/utils/auth'
import requestIp from 'request-ip'

const setCookieErr = async (
  res,
  response,
  locale
) => {
  // const MAX_AGE = 4
  const MAX_AGE = 60 * 60 * 24
  await setLoginSession(res, response, MAX_AGE)
  let p = config.basePath
  if (locale === 'en') {
    p = p + '/en'
  }
}

const url = config.hostBackendServerSide + '/api/v1/auth/refresh_token'
async function handler(
  req,
  res,
) {
  try {
    const [session, redirectPath] = await getLoginSession(req)
    if (!session) {
      res.status(401).end()
      return
    }

    const ip = requestIp.getClientIp(req)

    const { data, status } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${session.token}`,
        'x-ip': ip,
        'x-device-id': session.device_id || '',
        'x-user-agent': req.headers['user-agent'],
      }
    })

    // if (data?.success) {
    if (!!data?.access_token && !!data?.refresh_token) {
      // const user = getUserSession({ ...session, ...data?.response })
      const user = getUserSession({ ...session, ...data })
      await setLoginSession(res, user, 60 * 60 * 24 * 2)
      res.json(user)
      return
    }
  } catch (error) {
    console.error(error)
  }
  res.status(500).end()
}

export default handler;
