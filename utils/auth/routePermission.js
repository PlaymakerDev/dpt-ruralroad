import config from '@/config'
import { getLoginSession } from '@/utils/auth'

export async function validatePermissionRoute(req, res) {
  try {
    console.log('validatePermissionRoute called');
    const session = await getLoginSession(req)
    console.log('Session in validatePermissionRoute:', session ? 'exists' : 'null');
    
    return session;
  } catch (error) {
    console.error('Error in validatePermissionRoute:', error);
    return null;
  }
}

export function redirectToLogin(path = '/login') {
  return {
    redirect: {
      destination: path,
      permanent: false,
    },
  }
}

export function validateDeptType(){

}

export function sessionToProps(session, message, status) {
  // แปลง message เป็น string หรือใช้ค่า null
  const errorMessage = message ? message.toString() : null;
  
  return {
    props: {
      session: session || null,
      error: errorMessage,
      // เก็บข้อมูล status ไว้ใน session ถ้าจำเป็น
      ...(session && status ? { status } : {}),
    },
  }
}
