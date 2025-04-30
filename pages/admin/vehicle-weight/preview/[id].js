import React from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import PreviewScreen from '@/features/admin/vehicle-weight/preview/screen'
// CHECK ROLE
import { getLoginSession } from '@/utils/auth'
import { validatePermissionRoute, redirectToLogin, sessionToProps } from '@/utils/auth/routePermission'
import { wrapper, AppState } from '@/store'
import { signIn } from '@/store/features/userSlice'
import { useRouter } from 'next/router'

const PreviewPage = (props) => {
  const {  } = props
  const router = useRouter()
  
  return (
    <PageLayout>
      <PreviewScreen />
    </PageLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => (async (context) => {
  const session = await getLoginSession(context.req)

  const valid = validatePermissionRoute(session, ['ADMIN', 'USER'])
  if (!valid) {
    return redirectToLogin()
  }

  store.dispatch(signIn(session));

  return sessionToProps(session, session?.message)
}));

export default React.memo(PreviewPage)
