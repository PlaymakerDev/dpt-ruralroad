import React, { useCallback, useContext, useEffect } from 'react'
import { Row, Col, Card, Typography } from 'antd'
import { CardLastSevenDays, CardTotalVehicle, CardOverWeightVehicle, CardPercentageOverVehicle, CardAADT, CardPercentTruck, CardPCU } from '../components/card'
import DisplayMap from '../components/map/DisplayMap'
import { CCTVListing } from '../components/cctv'
import { CCTVSection, ProgressSection, TableSection } from '../components/section'
import { useWIMContext } from '../context'

const ProjectInfoScreen = (props) => {
	const { data, onChangeForm } = props
	const { setStationId } = useWIMContext()

	useEffect(() => {
		if (data?.id) {
			setStationId(data?.id)
		}
	}, [data?.id])

	return (
		<>
			<section>
				<Row gutter={[16, 16]}>
					<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
						<CardLastSevenDays
							stationId={data?.id}
						/>
					</Col>
					<Col xs={24} sm={24} md={18} lg={12} xl={12} xxl={8}>
						<DisplayMap
							stationId={data?.id}
							stationType={data?.type}
						/>
					</Col>
					<Col xs={24} sm={24} md={6} lg={24} xl={24} xxl={4}>
						<Row gutter={[16, 16]}>
							<Col xs={24} sm={8} md={24} lg={8} xl={8} xxl={24}>
								<CardTotalVehicle
									total={data?.total}
									stationId={data?.id}
									data={data}
								/>
							</Col>
							<Col xs={24} sm={8} md={24} lg={8} xl={8} xxl={24}>
								<CardOverWeightVehicle
									over={data?.over}
								/>
							</Col>
							<Col xs={24} sm={8} md={24} lg={8} xl={8} xxl={24}>
								<CardPercentageOverVehicle
									percentage={data?.over_10percent}
								/>
							</Col>
						</Row>
					</Col>
				</Row>
			</section>
			<section className='mt-5'>
				<Row gutter={[16, 16]}>
					{/* SUBCHART */}
					<Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
						<TableSection />
					</Col>
					<Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
						<ProgressSection />
					</Col>
					{/* CCTV */}
					<Col xs={24} sm={24} md={14} lg={12} xl={8} xxl={8}>
						<CCTVSection
							stationId={data?.id}
						/>
					</Col>
					{/* PROGRESS */}
					<Col xs={24} sm={24} md={10} lg={12} xl={4} xxl={4}>
						<Row gutter={[16, 16]}>
							<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
								<CardAADT

								/>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
								<CardPercentTruck
								/>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
								<CardPCU
								/>
							</Col>
						</Row>
					</Col>
				</Row>
			</section>
		</>
	)
}

export default React.memo(ProjectInfoScreen)
