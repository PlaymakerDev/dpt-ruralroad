import { getLoginSession } from '@/utils/auth'
import config from '@/config'

// API endpoint สำหรับตรวจสอบสถานะการ login
export default async function checkSession(req, res) {
  console.log('Check session API called');
  console.log('Request cookies:', req.headers.cookie);
  
  try {
    // ดึงข้อมูล session จาก cookie
    const [session, redirectPath] = await getLoginSession(req);
    
    console.log('Session check result:', JSON.stringify({
      hasSession: !!session,
      hasToken: !!session?.token,
      hasMapGroupName: !!session?.map_group_name,
      mapGroupName: session?.map_group_name
    }));
    
    // ถ้ามี session และข้อมูลครบถ้วน
    if (session && session.token && session.map_group_name) {
      return res.status(200).json({ 
        isLoggedIn: true,
        user: {
          username: session.username,
          map_group_name: session.map_group_name
        }
      });
    }
    
    // ถ้าไม่มี session หรือข้อมูลไม่ครบถ้วน
    return res.status(200).json({ 
      isLoggedIn: false,
      redirectTo: `${config.basePath}/login`
    });
  } catch (error) {
    console.error('Error checking session:', error.message);
    return res.status(500).json({ 
      isLoggedIn: false,
      error: 'Error checking session',
      redirectTo: `${config.basePath}/login`
    });
  }
}
