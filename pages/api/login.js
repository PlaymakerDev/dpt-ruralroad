import axios, { AxiosError } from 'axios'
import { setLoginSession, getUserSession } from '@/utils/auth'
import { MAX_AGE } from '@/utils/auth/authCookies'
import config from '@/config'
import permission from '@/utils/auth/permission';
import requestIp from 'request-ip'

const url = config.hostBackendServerSide + '/api/v1/auth/token'
const authmeUrl = config.hostBackendServerSide + '/api/v1/auth/me'

const toLoginAgain = async (
  res,
  response,
  locale
) => {
  const MAX_AGE = 4
  await setLoginSession(res, response, MAX_AGE)
  let p = config.basePath
  if (locale === 'en') {
    p = p + '/en'
  }
  res.status(200).json({ 
    success: false, 
    redirectTo: p + '/login',
    error: 'กรุณาเข้าสู่ระบบอีกครั้ง'
  })
}

// Handle POST request
export default async function login(req, res) {
  console.log('Login API called with method:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  // Get the request body
  const { username, password, role, locale, remember_me_checked, token, device_id } = req.body
  console.log('Login request for user:', username, 'with role:', role);
  
  // Log login attempt
  console.log('Login attempt with username:', username)

  try {
    console.log('TOKEN_SECRET:', process.env.TOKEN_SECRET ? 'exists' : 'missing')
    console.log('config.token_secret:', config.token_secret ? 'exists' : 'missing')
    console.log('Backend URL:', url)

    // Get client IP
    const clientIp = requestIp.getClientIp(req)
    console.log('Client IP:', clientIp)

    // Prepare request body
    const body = {
      username,
      password,
      role: role || 'ADMIN',
      device_id: device_id || '',
      ip: clientIp || '',
    }

    // Prepare request headers
    const configHeader = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    // Make the request to the backend
    console.log('Calling auth API at:', url);
    const { data, status } = await axios.post(url, body, configHeader)
    console.log('Auth API response status:', status);
    console.log('Auth data:', JSON.stringify(data));

    // If the request was successful
    if (status === 201) {
      // Get auth data
      console.log('Auth data after authme:', JSON.stringify(data))

      // ตรวจสอบว่ามี access_token หรือไม่
      if (!data.access_token) {
        console.error('No access_token in response:', JSON.stringify(data));
        return res.status(500).json({
          success: false,
          message: data.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง'
        });
      }

      // เรียก API /api/v1/auth/me เพื่อดึงข้อมูลผู้ใช้เพิ่มเติม
      let user;
      try {
        console.log('Calling authme API at:', authmeUrl);
        const authmeResponse = await axios.get(authmeUrl, {
          headers: {
            'Authorization': `Bearer ${data.access_token}`,
            'Content-Type': 'application/json',
          }
        });
        
        console.log('Authme API response:', JSON.stringify(authmeResponse.data));
        
        // รวมข้อมูลจาก token และ authme
        const userData = {
          ...data,
          ...authmeResponse.data,
          // ใช้ group_name จาก authme API แปลงเป็นตัวพิมพ์ใหญ่ทั้งหมด
          map_group_name: authmeResponse.data.group_name ? authmeResponse.data.group_name.toUpperCase() : (role || 'ADMIN')
        };
        
        // Set up user session
        user = getUserSession(userData);
        console.log('Setting login session with user:', JSON.stringify(user));
      } catch (authmeError) {
        console.error('Error calling authme API:', authmeError.message);
        
        // ถ้าเรียก authme ไม่สำเร็จ ให้ใช้ข้อมูลจาก token อย่างเดียว
        // Set up user session with role from request
        const userData = {
          ...data,
          // ใช้ role จาก request โดยตรง และตรวจสอบว่าเป็นตัวพิมพ์ใหญ่ทั้งหมด
          map_group_name: role ? role.toUpperCase() : 'ADMIN'
        };
        user = getUserSession(userData);
        console.log('Setting login session with user (without authme):', JSON.stringify(user));
      }

      // Set max age based on remember me checkbox
      const maxAge = remember_me_checked === 'true' ? Math.floor(MAX_AGE) : Math.floor(MAX_AGE / 7)
      console.log('Setting cookie with maxAge:', maxAge);

      // Set login session
      await setLoginSession(res, user, maxAge)

      // Get permission manager
      const pm = permission(user)
      console.log('User permission:', {
        roleUser: pm.roleUser,
        isAdmin: pm.isAdmin(),
        isUser: pm.isUser()
      });
      
      // Get index page for the user's role
      const indexPage = pm.indexPage()
      console.log('Index page for user role:', indexPage);

      // Use only the indexPage for redirect, not including basePath
      let redirectURL = indexPage
      
      // Add locale if needed
      if (locale === 'en') {
        // For English locale, prepend 'en/' to the path
        redirectURL = 'en/' + redirectURL
      }

      // Make sure redirectURL starts with a slash
      if (!redirectURL.startsWith('/')) {
        redirectURL = '/' + redirectURL
      }

      // Debug logs - simplified
      console.log('Login successful, redirecting to:', redirectURL)
      
      // ตรวจสอบว่า cookie ถูกตั้งค่าหรือไม่
      console.log('Response headers:', res.getHeader('Set-Cookie'));
      
      // ส่ง response ที่มี cookie และ redirectTo URL
      return res.status(200).json({ 
        success: true, 
        redirectTo: redirectURL,
        user: {
          username: user.username,
          role: user.map_group_name
        }
      })
    } else {
      const user = getUserSession(data)
      await toLoginAgain(res, user, locale)
      return
    }
  } catch (error) {
    console.error('Login error:', error.message)
    
    if (error instanceof AxiosError) {
      console.log('AxiosError status:', error.response?.status)
      console.log('AxiosError data:', JSON.stringify(error.response?.data))
      
      // Handle authentication error
      if (error.response?.status === 401) {
        return res.status(401).json({
          success: false,
          message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
        })
      }
    }
    
    // Handle other errors
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง'
    })
  }
}
