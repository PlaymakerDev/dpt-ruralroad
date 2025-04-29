import { removeTokenCookie } from '@/utils/auth/authCookies'
import config from '@/config'

export default async function logout(
  req,
  res,
) {
  const role = req?.query?.role
  
  let location
  switch (role) {
    case 'ADMIN':
      location = `${config.basePath}/login`
      break;
    case 'USER':
      location = `${config.basePath}/login`
      break;
    default:
      location = `${config.basePath}/login`
  }

  removeTokenCookie(res)
  res.writeHead(302, { Location: location })
  res.end()
}
