import React, { useEffect } from 'react'
import { Card, Row, Col, Typography } from 'antd'
import { Field } from '@/components/form'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getProvince, getDistrict, getSubDistrict, clearDistrict, clearSubDistrict } from '@/store/features/masterSlice'
import { useAppDispatch } from '@/store/hooks'

const ArrestInformation = (props) => {
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
    if (values.police_station_province_id) {
      apiGetDistrict('/api/v1/masters/districts', { ...district.overview.search, province_id: values.police_station_province_id, page_size: 2000000 }, false)
    }
    dispatch(clearDistrict({ data: [] }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.police_station_province_id])

  useEffect(() => {
    if (values.police_station_district_id) {
      apiGetSubDistrict('/api/v1/masters/subdistricts', { ...subDistrict.overview.search, district_id: values.police_station_district_id, page_size: 2000000 }, false)
    }
    dispatch(clearSubDistrict({ data: [] }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.police_station_district_id])

  return (
    <Card
      title={<Typography.Text className='!m-0 !text-white'>ข้อมูลการจับกุม</Typography.Text>}
      classNames={{
        header: '!bg-[#56E4EE23]'
      }}
    >
      <section>
        <Row gutter={[16, 16]}>
        </Row>
      </section>
      <section className='mt-5'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='ชื่อผู้จับกุม'
              name='officer1'
              placeholder='ชื่อผู้จับกุม'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='พยานจับกุม1'
              name='witness1'
              placeholder='พยานจับกุม1'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='พยานจับกุม2'
              name='witness2'
              placeholder='พยานจับกุม2'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='พยานนำส่ง'
              name='witness_sender'
              placeholder='พยานนำส่ง'
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Field.Checkbox
              name='process'
              optKeys={['value', 'label']}
              options={[
                {
                  label: (<Typography.Text className='!text-white'>ส่งฟ้อง</Typography.Text>),
                  value: true
                }
              ]}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='ท้องที่เกิดเหตุ (สภ.)'
              name='police_station'
              placeholder='ท้องที่เกิดเหตุ (สภ.)'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Select
              label='จังหวัด'
              name='police_station_province_id'
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
                  police_station_district_id: '',
                  police_station_subdistrict_id: ''
                })
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Select
              label='อำเภอ'
              name='police_station_district_id'
              placeholder='อำเภอ'
              optKeys={['id', 'name_th']}
              options={district.overview.data || []}
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              onChange={(name, value) => {
                handlerChange({
                  [name]: value,
                  police_station_subdistrict_id: ''
                })
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Select
              label='ตำบล'
              name='police_station_subdistrict_id'
              placeholder='ตำบล'
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

          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='มูลค่าทรัพย์สินที่เกิดขึ้น'
              name='asset_value'
              placeholder='มูลค่าทรัพย์สินที่เกิดขึ้น'
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Field.Checkbox
              name='consider'
              optKeys={['value', 'label']}
              options={[
                {
                  label: (<Typography.Text className='!text-white'>ศาลพิจารณา</Typography.Text>),
                  value: true
                }
              ]}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='ที่ คค 0718.6/'
              name='book_no'
              placeholder='ที่ คค 0718.6/'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='สำเนาทะเบียนรถ'
              name='copy_lp_no'
              placeholder='สำเนาทะเบียนรถ'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='ประเภทใบขับขี่'
              name='driver_license_type'
              placeholder='ประเภทใบขับขี่'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='ใบชั่งน้ำหนักจากบริษัท'
              name='weight_slip_from_company'
              placeholder='ใบชั่งน้ำหนักจากบริษัท'
            />
          </Col>
        </Row>
      </section>
    </Card >
  )
}

export default React.memo(ArrestInformation)
