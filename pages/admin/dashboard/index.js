import React, { useEffect, useMemo, useRef } from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import DashboardScreen from '@/features/admin/dashboard/screen'
// CHECK ROLE
import { getLoginSession } from '@/utils/auth'
import { validatePermissionRoute, redirectToLogin, sessionToProps } from '@/utils/auth/routePermission'
import permission from '@/utils/auth/permission'
import { wrapper } from '@/store'
import { signIn } from '@/store/features/userSlice'
import { useRouter } from 'next/router'
import axios from 'axios'
import FormSearchDashboard from '@/features/admin/dashboard/components/form/FormSearchDashboard'
import { DashboardProvider } from '@/features/admin/dashboard/components/context'

const DashboardPage = (props) => {
  const { session } = props
  const router = useRouter()
  const refSubmit = useRef()

  // useEffect(() => {
  //   console.log('Dashboard page loaded');
  //   console.log('Current router path:', router.asPath);
  //   console.log('Session data:', session);

  //   // ถ้าไม่มี session หรือ session ไม่สมบูรณ์
  //   if (!session || !session.token || !session.map_group_name) {
  //     console.log('Incomplete session detected in client, redirecting to login');

  //     // เรียก API เพื่อตรวจสอบสถานะการ login อีกครั้ง
  //     fetch('/api/auth/check-session', {
  //       method: 'GET',
  //       credentials: 'include'
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       if (!data.isLoggedIn) {
  //         // ถ้ายังไม่ได้ login จริงๆ ให้ redirect ไปหน้า login
  //         router.push('/login');
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error checking session:', error);
  //       // กรณีเกิด error ให้ redirect ไปหน้า login เพื่อความปลอดภัย
  //       router.push('/login');
  //     });
  //   }
  // }, [session, router.asPath, router])

  const renderFormSearch = useMemo(() => {
    return (
      <FormSearchDashboard
        refSubmit={refSubmit}
      />
    )
  }, [refSubmit, router])

  return (
    <DashboardProvider>
      <PageLayout
        breadcrumb={<p>&nbsp;</p>}
        extraHeader={renderFormSearch}
      >
        <DashboardScreen
          accessType={router?.query?.type}
        />
      </PageLayout>
    </DashboardProvider>
  )
}

// export const getServerSideProps = wrapper.getServerSideProps(store => (async (context) => {
//   console.log('getServerSideProps in dashboard called');
//   console.log('Request cookies:', context.req.headers.cookie);

//   try {
//     // Get session
//     const [session, redirectPath] = await getLoginSession(context.req);

//     console.log('Dashboard session:', JSON.stringify({
//       hasSession: !!session,
//       hasToken: !!session?.token,
//       hasMapGroupName: !!session?.map_group_name,
//       mapGroupName: session?.map_group_name
//     }));

//     // ฟังก์ชันสำหรับ redirect ไปหน้า login
//     const redirectToLogin = (error = 'session_invalid') => {
//       console.log(`Redirecting to login with error: ${error}`);
//       return {
//         redirect: {
//           destination: `/login?error=${error}`,
//           permanent: false,
//         },
//       };
//     };

//     // ตรวจสอบว่ามี session และ token หรือไม่
//     if (!session) {
//       console.log('No session found, redirecting to login');
//       return redirectToLogin();
//     }

//     if (!session.token) {
//       console.log('Session has no token, redirecting to login');
//       return redirectToLogin('no_token');
//     }

//     // ตรวจสอบว่ามี map_group_name หรือไม่
//     if (!session.map_group_name) {
//       console.log('Session missing map_group_name, attempting logout');

//       try {
//         // ลอง logout เพื่อล้าง session ที่มีปัญหา
//         await axios.get('/api/logout', {
//           baseURL: `http://${context.req.headers.host}`
//         });
//       } catch (error) {
//         console.error('Failed to logout during session validation:', error);
//       }

//       return redirectToLogin('missing_role');
//     }

//     // ตรวจสอบสิทธิ์การเข้าถึง
//     const pm = permission(session);
//     const hasAccess = pm.hasAccess('dashboard');

//     console.log('Permission check:', {
//       roleUser: pm.roleUser,
//       isAdmin: pm.isAdmin(),
//       isUser: pm.isUser(),
//       hasAccess
//     });

//     // ตรวจสอบว่าผู้ใช้มี role ที่ถูกต้องหรือไม่
//     const validRole = ['ADMIN', 'USER'].includes(session.map_group_name);

//     if (!validRole) {
//       console.log('User has invalid role:', session.map_group_name);
//       return redirectToLogin('invalid_role');
//     }

//     if (!hasAccess) {
//       console.log('User does not have access to dashboard');
//       return redirectToLogin('access_denied');
//     }

//     console.log('Permission check passed, dispatching signIn');
//     store.dispatch(signIn(session));

//     return sessionToProps(session);
//   } catch (error) {
//     console.error('Error in dashboard getServerSideProps:', error);
//     return {
//       redirect: {
//         destination: '/login?error=server_error',
//         permanent: false,
//       },
//     };
//   }
// }));

export const getServerSideProps = wrapper.getServerSideProps(store => (async (context) => {
  const { type } = context.query
  const INIT_STATE = store.getState("user")
  // GET SESSION
  const session = await getLoginSession(context.req)

  if (type === "EXECUTIVE" || type === "CITIZEN") {
    store.dispatch(signIn(INIT_STATE))
  } else {
    const valid = validatePermissionRoute(session, ['ADMIN', 'USER'])
    if (!valid) {
      return redirectToLogin()
    }

    store.dispatch(signIn(session));

    return sessionToProps(session, session?.message)
  }
}));

export default React.memo(DashboardPage)
