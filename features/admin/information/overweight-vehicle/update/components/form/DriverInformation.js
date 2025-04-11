import React, { useEffect } from 'react'
import { Card, Row, Col, Typography } from 'antd'
import { Field } from '@/components/form'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getProvince, getDistrict, getSubDistrict, clearDistrict, clearSubDistrict } from '@/store/features/masterSlice'
import { useAppDispatch } from '@/store/hooks'

const DriverInformation = (props) => {
  const { values, errors, handlerChange } = props
  const dispatch = useAppDispatch()
  // GET MASTER DATA
  const [apiGetProvince, loadProvince, province] = useGetAPI('overlay', {
    funcDispatch: getProvince, reducerName: 'master', reducerKey: 'province'
  })

  const [apiGetDistrict, loadDistrict, district] = useGetAPI('overlay', {
    funcDispatch: getDistrict, reducerName: 'master', reducerKey: 'district'
  })

  const [apiGetSubDistrict, loadSubDistrict, subDistrict] = useGetAPI('overlay', {
    funcDispatch: getSubDistrict, reducerName: 'master', reducerKey: 'sub_district'
  })

  useEffect(() => {
    apiGetProvince('/api/v1/masters/provinces', { ...province.overview.search, page_size: 2000000 }, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (values.province) {
      apiGetDistrict('/api/v1/masters/districts', { ...district.overview.search, province_id: values.province, page_size: 2000000 }, false)
    }
    dispatch(clearDistrict({ data: [] }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.province])

  useEffect(() => {
    if (values.district) {
      apiGetSubDistrict('/api/v1/masters/subdistricts', { ...subDistrict.overview.search, district_id: values.district, page_size: 2000000 }, false)
    }
    dispatch(clearSubDistrict({ data: [] }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.district])

  return (
    <Card
      title={<Typography.Text className='!m-0 !text-white'>ข้อมูลคนขับรถ</Typography.Text>}
      classNames={{
        header: '!bg-[#56E4EE23]'
      }}
    >
      <section >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='ชื่อ-สกุล'
              name='driver_name'
              placeholder='ชื่อ-สกุล'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='บ้านเลขที่'
              name='address_no'
              placeholder='บ้านเลขที่'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='หมู่'
              name='moo'
              placeholder='หมู่'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='ซอย'
              name='soi'
              placeholder='ซอย'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='ถนน'
              name='road'
              placeholder='ถนน'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Select
              label='จังหวัด'
              name='province'
              placeholder='จังหวัด'
              optKeys={['id', 'name_th']}
              options={province.overview.data || []}
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              onChange={(name, value) => {
                handlerChange({
                  [name]: value,
                  district: '',
                  subdistrict: ''
                })
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Select
              label='อำเภอ/เขต'
              name='district'
              placeholder='อำเภอ/เขต'
              optKeys={['id', 'name_th']}
              options={district.overview.data || []}
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              onChange={(name, value) => {
                handlerChange({
                  [name]: value,
                  subdistrict: ''
                })
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Select
              label='ตำบล/แขวง'
              name='subdistrict'
              placeholder='ตำบล/แขวง'
              optKeys={['id', 'name_th']}
              options={subDistrict.overview.data || []}
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              onChange={(name, value) => {
                handlerChange({
                  [name]: value,
                })
              }}
            />
          </Col>
        </Row>
      </section>
    </Card>
  )
}

export default React.memo(DriverInformation)
