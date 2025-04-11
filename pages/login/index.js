import React from 'react'
import { connect } from 'react-redux'
import { wrapper } from '@/store'
import { getLoginSession } from '@/utils/auth'
import { sessionToProps } from '@/utils/auth/routePermission'
import { signIn } from '@/store/features/userSlice'
import LoginPageScreen from '@/features/login/screen'
import permission from '@/utils/auth/permission'
import axios from 'axios';

const LoginPage = (props) => {
  // แปลงค่า error เป็น string ถ้าเป็น object
  const errorMessage = props.error && typeof props.error === 'object' 
    ? (props.error.message || JSON.stringify(props.error)) 
    : props.error;

  return (
    <LoginPageScreen
      error={errorMessage}
      username={props.user?.username}
      user={props.user}
    />
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => (async (context) => {
  try {
    // ตรวจสอบ referer เพื่อป้องกัน redirect loop
    const referer = context.req.headers.referer || '';
    console.log('Login page referer:', referer);
    
    if (referer.includes('/admin/dashboard')) {
      console.log('Detected potential redirect loop from dashboard to login');
      
      // ลอง logout เพื่อล้าง session ที่มีปัญหา
      try {
        await axios.get('/api/logout', {
          baseURL: `http://${context.req.headers.host}`
        });
        console.log('Logged out to break redirect loop');
      } catch (error) {
        console.error('Failed to logout to break redirect loop:', error);
      }
    }
    
    // ตรวจสอบ session
    const [session] = await getLoginSession(context.req);
    
    console.log('Login page session check:', {
      hasSession: !!session,
      hasToken: !!session?.token,
      hasMapGroupName: !!session?.map_group_name
    });
    
    // ถ้ามี session และมี token และมี map_group_name ให้ redirect ไปหน้า dashboard
    if (session && session.token && session.map_group_name) {
      console.log('User already logged in, redirecting to dashboard');
      
      // ใช้ permission เพื่อหาหน้าที่ควร redirect ไป
      const pm = permission(session);
      const indexPage = pm.indexPage();
      
      return {
        redirect: {
          destination: indexPage,
          permanent: false,
        },
      };
    }
    
    // ถ้าไม่มี session หรือไม่มี token หรือไม่มี map_group_name ให้แสดงหน้า login
    const error = context.query.error || null;
    let errorMessage = null;
    
    if (error) {
      switch (error) {
        case 'session_invalid':
          errorMessage = 'Session ไม่ถูกต้องหรือหมดอายุ กรุณาเข้าสู่ระบบใหม่';
          break;
        case 'missing_role':
          errorMessage = 'ไม่พบข้อมูลสิทธิ์การใช้งาน กรุณาเข้าสู่ระบบใหม่';
          break;
        case 'invalid_role':
          errorMessage = 'สิทธิ์การใช้งานไม่ถูกต้อง กรุณาติดต่อผู้ดูแลระบบ';
          break;
        case 'access_denied':
          errorMessage = 'คุณไม่มีสิทธิ์เข้าถึงหน้านี้ กรุณาติดต่อผู้ดูแลระบบ';
          break;
        default:
          errorMessage = null;
      }
    }
    
    // ถ้า error เป็น object ให้แปลงเป็น string
    if (typeof errorMessage === 'object') {
      errorMessage = errorMessage.message || JSON.stringify(errorMessage);
    }
    
    return {
      props: {
        error: errorMessage,
      },
    };
  } catch (error) {
    console.error('Failed to get server side props:', error);
    return {
      props: {
        error: null,
      },
    };
  }
}));

export default connect((state) => state)(LoginPage);