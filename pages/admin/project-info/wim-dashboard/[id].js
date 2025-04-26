import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import WIMDashboardScreen from '@/features/admin/project-info/wim-dashboard/screen'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import { Breadcrumb } from 'antd'

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

export default React.memo(WIMDashboardPage)
