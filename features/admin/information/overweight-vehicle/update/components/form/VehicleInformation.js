import React, { useEffect, useMemo } from 'react'
import { Card, Row, Col, Typography } from 'antd'
import { Field } from '@/components/form'
import { useAppSelector } from '@/store/hooks'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getProvincePlate } from '@/store/features/masterSlice'

const VehicleInformation = (props) => {
  const { values } = props
  const province = useAppSelector(state => state.master.province.overview.data)

  const [apiGetProvincePlate, loadProvincePlate, provincePlate] = useGetAPI('overlay', {
    funcDispatch: getProvincePlate, reducerName: 'master', reducerKey: 'province_plate'
  })

  useEffect(() => {
    apiGetProvincePlate('/api/v1/masters/province_plates', { ...provincePlate.search }, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const headProvince = provincePlate?.data?.find((item) => item.id == values?.lp_head_province_id)?.name || '-'
  const tailProvince = provincePlate?.data?.find((item) => item.id == values?.lp_tail_province_id)?.name || '-'



  const renderProvincePlate = useMemo(() => {
    const newProvincePlate = provincePlate.data?.map((item) => {
      return {
        ...item,
        id: String(item.id),
      }
    })
    return newProvincePlate
  }, [provincePlate.data])



  return (
    <Card
      title={<Typography.Text className='!m-0 !text-white'>ข้อมูลรถบรรทุก</Typography.Text>}
      classNames={{
        header: '!bg-[#56E4EE23]'
      }}
    >
      <section>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='ยี่ห้อรถ'
              name='brand'
              placeholder='ยี่ห้อรถ'
              className="text-black"

            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            {/* <Field.Select
              label='ทะเบียนรถหัวลาก'
              name='lp_head_no'
              placeholder='ทะเบียนรถหัวลาก'
              optKeys={['id', 'name']}
              options={renderProvincePlate || []}
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            /> */}
            <Field.Input
              label='ทะเบียนรถหัวลาก'
              name='lp_head_no'
              placeholder='ทะเบียนรถหัวลาก'
              className="text-black"

            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='จังหวัดหัวลาก'
              placeholder='จังหวัดหัวลาก'
              className="text-black"
              disabled
              value={headProvince}
            />
            <div className='hidden'>
              <Field.Select
                label='จังหวัดหัวลาก'
                name='lp_head_province_id'
                placeholder='จังหวัดหัวลาก'
                optKeys={['id', 'name']}
                options={provincePlate.data || []}
                allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              />
            </div>

          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='ทะเบียนรถหางลาก'
              name='lp_tail_no'
              placeholder='ทะเบียนรถหางลาก'
              className="text-black"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
           <Field.Input
              label='จังหวัดหางลาก'
              placeholder='จังหวัดหางลาก'
              className="text-black"
              disabled
              value={tailProvince}
            />
            <div className='hidden'>
              <Field.Select
                label='จังหวัดหางลาก'
                name='lp_tail_province_id'
                placeholder='จังหวัดหางลาก'
                optKeys={['id', 'name']}
                options={provincePlate.data || []}
                allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                className="text-black"

              />
            </div>
          </Col>
        </Row>
      </section>
    </Card>
  )
}

export default React.memo(VehicleInformation)
