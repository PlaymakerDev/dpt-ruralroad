import React from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import CreateScreen from '@/features/admin/setting/create/screen'
// CHECK ROLE
import { getLoginSession } from '@/utils/auth'
import { validatePermissionRoute, redirectToLogin, sessionToProps } from '@/utils/auth/routePermission'
import { wrapper, AppState } from '@/store'
import { signIn } from '@/store/features/userSlice'

const CreatePage = (props) => {
  const { } = props

  return (
    <PageLayout>
      <CreateScreen />
    </PageLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => (async (context) => {
  const session = await getLoginSession(context.req)

  const valid = validatePermissionRoute(session, ['ADMIN'])
  if (!valid) {
    return redirectToLogin()
  }

  store.dispatch(signIn(session));

  return sessionToProps(session, session?.message)
}));

export default React.memo(CreatePage)
