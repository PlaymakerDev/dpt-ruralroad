import React from 'react'
import { Row, Col, Card } from 'antd'
import { OverviewSection, ChartSection, CCTVSection } from '../components/section'

const ProjectInfoScreen = (props) => {
	const { data } = props

	return (
		<>
			<section>
				<Row gutter={[16, 16]}>
					<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={8}>
						<OverviewSection
							data={data}
						/>
					</Col>
					<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={16}>
						<ChartSection
							data={data}
						/>
					</Col>
				</Row>
			</section>
			<section className='mt-5'>
				<CCTVSection
					stationId={data?.id}
				/>
			</section>
		</>
	)
}

export default React.memo(ProjectInfoScreen)
