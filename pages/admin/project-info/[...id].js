import React from 'react'
import { useRouter } from 'next/router'
import ProjectInfoScreen from '@/features/admin/project-info/screen'
import PageLayout from '@/components/layout/new-layout/PageLayout'

const ProjectDetailPage = (props) => {
	const { } = props
	const router = useRouter()

	return (
		<PageLayout>
			<ProjectInfoScreen
				id={router?.query}
			/>
		</PageLayout>
	)
}

export default React.memo(ProjectDetailPage)
