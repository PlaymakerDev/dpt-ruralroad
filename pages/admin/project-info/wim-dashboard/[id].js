import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import WIMDashboardScreen from '@/features/admin/project-info/wim-dashboard/screen'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import { Breadcrumb } from 'antd'
// CHECK ROLE
import { getLoginSession } from '@/utils/auth'
import { validatePermissionRoute, redirectToLogin, sessionToProps } from '@/utils/auth/routePermission'
import { wrapper, AppState } from '@/store'
import { signIn } from '@/store/features/userSlice'

const WIMDashboardPage = (props) => {
	const { } = props
	const router = useRouter()

	const renderBreadcrumb = useMemo(() => {
		return (
			<Breadcrumb separator='>'>
				<Breadcrumb.Item
					className='text-gray-500 cursor-pointer hover:text-white transition duration-300'
					onClick={() => router.push('/admin/dashboard')}
				>
					หน้าหลัก
				</Breadcrumb.Item>
				<Breadcrumb.Item className='font-bold'>{router?.query?.name || '-'}</Breadcrumb.Item>
			</Breadcrumb>
		)
	}, [router])

	return (
		<PageLayout
			breadcrumb={renderBreadcrumb}
		>
			<WIMDashboardScreen
				data={router?.query}
			/>
		</PageLayout>
	)
}

export const getServerSideProps = wrapper.getServerSideProps(store => (async (context) => {
	const session = await getLoginSession(context.req)

	const valid = validatePermissionRoute(session, ['ADMIN', 'USER'])
	if (!valid) {
		return redirectToLogin(redirectPath)
	}

	store.dispatch(signIn(session));

	return sessionToProps(session, session?.message)
}));

export default React.memo(WIMDashboardPage)
