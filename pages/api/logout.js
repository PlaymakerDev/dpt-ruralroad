import { removeTokenCookie } from '@/utils/auth/authCookies'
import config from '@/config'
import axios, { AxiosError } from 'axios'
import { getLoginSession } from '@/utils/auth'
import requestIp from 'request-ip'

const url = config.hostBackendServerSide + '/api/v1/auth/logout'
export default async function logout(
  req,
  res,
) {
  try {
    console.log('Logging out user')
    const role = req?.query?.role
    
    // Get session before removing cookie
    const [session, redirectPath] = await getLoginSession(req)
    console.log('Current session:', session ? 'exists' : 'none')
    
    // Remove cookie
    removeTokenCookie(res)
    console.log('Token cookie removed')
    
    const ip = requestIp.getClientIp(req)
    
    // Call backend logout if session exists
    if (session && session.token) {
      try {
        const configHeader = {
          headers: {
            'Authorization': 'Bearer ' +  session.token,
            'x-ip': ip,
            'x-user-agent': req.headers['user-agent'],
          }
        };
        console.log('Calling backend logout API')
        await axios.post(url, { data: null }, configHeader)
        console.log('Backend logout successful')
      } catch (error) {
        console.error('Error calling backend logout:', error.message)
      }
    }

    let location
    switch (role) {
      case 'ADMIN':
        location = `${config.basePath}/login`
        break;
      default:
        location = `${config.basePath}/login`
    }

    console.log('Redirecting to:', location)
    return res.status(200).json({ 
      success: true, 
      redirectTo: location,
      message: 'Logged out successfully'
    })
  } catch (error) {
    console.error('Error in logout handler:', error.message)
    return res.status(500).json({ 
      success: false, 
      redirectTo: `${config.basePath}/login`,
      error: 'Error during logout'
    })
  }
}
