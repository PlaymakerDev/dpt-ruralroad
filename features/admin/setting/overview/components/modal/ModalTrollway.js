import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Modal, Row, Col, message } from "antd";
import { Form, Field, useForm } from "@/components/form";
import { getDepartmentAll as getMasterDepartmentAll, getProvince, getDistrict, getSubDistrict, clearDistrict, clearSubDistrict } from '@/store/features/masterSlice'
import useGetAPI from "@/utils/hooks/api/useGetAPI";
import usePostAPI from '@/utils/hooks/api/usePostAPI'
import usePutAPI from '@/utils/hooks/api/usePutAPI'
import { useAppDispatch } from '@/store/hooks'

const Content = (props) => {
  const { type, id, data, funcGet, ref_btn, setOpen, masterProvince } = props;
  const dispatch = useAppDispatch()
  // API
  const [apiPut, loadingPut] = usePutAPI('overlay')
  const [apiPost, loadingPost] = usePostAPI('overlay')
  // GET MASTER DATA
  const [apiGetMasterDepartment, loadingMasterDepartment, masterDepartment] = useGetAPI('overlay', {
    funcDispatch: getMasterDepartmentAll, reducerName: 'master', reducerKey: 'departments'
  })
  const [apiGetProvince, loadProvince, province] = useGetAPI('overlay', {
    funcDispatch: getProvince, reducerName: 'master', reducerKey: 'province'
  })

  // const [apiGetDistrict, loadDistrict, district] = useGetAPI('overlay', {
  //   funcDispatch: getDistrict, reducerName: 'master', reducerKey: 'district'
  // })

  // const [apiGetSubDistrict, loadSubDistrict, subDistrict] = useGetAPI('overlay', {
  //   funcDispatch: getSubDistrict, reducerName: 'master', reducerKey: 'sub_district'
  // })

  const form = useForm({
    initialValues: {
      trollway_code: data?.way_code || '',
      trollway_name: data?.name || '',
      province: data?.province || '',
      district: data?.district || '',
      subdistrict: data?.subdistrict || '',
      department: data?.dept_id || '',
      distance: data?.distance || '',
      dept_group: data?.dept_group || ''
    },
    rules: {},
  });

  const { handlerChange, values } = form

  const buildValue = useCallback((values, next) => {
    let body = {}
    if (type === 'edit') {
      body = {
        way_code: values.trollway_code || '',
        name: values.trollway_name || '',
        dept_group: (values.dept_group).toString() || '',
        dept_id: (values.department).toString() || '',
        province: values.province || '',
        subdistrict: values.subdistrict || '',
        district: values.district || '',
        distance: Number(values.distance) || 0,
        id: id || ''
      }
      next(body);
    } else if (type === 'create') {
      body = {
        way_code: values.trollway_code || '',
        name: values.trollway_name || '',
        dept_group: (values.dept_group).toString() || '',
        dept_id: (values.department).toString() || '',
        province: (values.province).toString() || '',
        subdistrict: (values.subdistrict).toString() || '',
        district: (values.district).toString() || '',
        distance: Number(values.distance) || 0
      }
      next(body);
    }
  }, [type, id]);

  const handlerSubmit = useCallback(async (values) => {
    if (type === 'edit') {
      const { success } = await apiPut(`/api/v1/masters/way/${id}`, values, {}, false);
      if (success) {
        funcGet({})
        setOpen({ open: false, data: {}, type: null })
        message.success('แก้ไขข้อมูลสำเร็จ')
      } else {
        message.error('ไม่สามารถแก้ไขข้อมูลได้')
      }
    } else if (type === 'create') {
      const { success } = await apiPost(`/api/v1/masters/way`, values, {}, false);
      if (success) {
        funcGet({})
        setOpen({ open: false, data: {}, type: null })
        message.success('บันทึกข้อมูลสำเร็จ')
      } else {
        message.error('ไม่สามารถบันทึกข้อมูลได้')
      }
    }
  }, [apiPost, apiPut, funcGet, id, setOpen, type]);

  useEffect(() => {
    apiGetMasterDepartment('/api/v1/masters/departments_all', {}, false, {})
    apiGetProvince('/api/v1/masters/provinces', { ...province.overview.search, page_size: 2000000 }, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   if (values.province) {
  //     apiGetDistrict('/api/v1/masters/districts', { ...district.overview.search, province_id: values.province, page_size: 2000000 }, false)
  //   }
  //   dispatch(clearDistrict({ data: [] }))
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [values.province])

  // useEffect(() => {
  //   if (values.district) {
  //     apiGetSubDistrict('/api/v1/masters/subdistricts', { ...subDistrict.overview.search, district_id: values.district, page_size: 2000000 }, false)
  //   }
  //   dispatch(clearSubDistrict({ data: [] }))
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [values.district])

  const renderDepartment = useMemo(() => {
    let data = []
    if (!!masterDepartment.all.data) {
      data = masterDepartment.all.data?.map(item => ({
        ...item,
        id: String(item.id)
      }))
    }
    return data
  }, [masterDepartment])

  return (
    <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
          <Field.Input
            label="รหัสสายทาง"
            name="trollway_code"
            placeholder="รหัสสายทาง"
            hideRequired
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={16} xl={16} xxl={16}>
          <Field.Input
            label="ชื่อสายทาง"
            name="trollway_name"
            placeholder="ชื่อสายทาง"
            hideRequired
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
          <Field.Select
            label='จังหวัด'
            name='province'
            placeholder='จังหวัด'
            optKeys={['name_th', 'name_th']}
            options={province.overview.data || []}
            allowClear
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            // onChange={(name, value) => {
            //   handlerChange({
            //     [name]: value,
            //     district: '',
            //     subdistrict: ''
            //   })
            // }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
          <Field.Input
            label='อำเภอ/เขต'
            name='district'
            placeholder='อำเภอ/เขต'
          />
          {/* <Field.Select
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
          /> */}
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
          <Field.Input
            label='ตำบล/แขวง'
            name='subdistrict'
            placeholder='ตำบล/แขวง'
          />
          {/* <Field.Select
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
          /> */}
        </Col>
        <Col xs={24} sm={24} md={12} lg={16} xl={16} xxl={16}>
          <Field.Select
            label="หน่วยงาน"
            name="department"
            placeholder="หน่วยงาน"
            optKeys={['id', 'name']}
            options={renderDepartment || []}
            allowClear
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            onChange={(n, v) => {
              handlerChange({
                [n]: v,
                dept_group: renderDepartment?.find((item) => item?.id === v)?.group
              })
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
          <Field.Input
            label="ระยะทาง"
            name="distance"
            placeholder="ระยะทาง"
            onChange={(n, v) => {
              handlerChange({ [n]: v.replace(/[^0-9]/g, '') })
            }}
          />
        </Col>
      </Row>
      <button ref={ref_btn} type="submit" hidden></button>
    </Form>
  );
};

const ModalTrollway = (props) => {
  const { open, setOpen, type, data, funcGet, masterProvince } = props;
  const ref_btn = useRef(null)
  const [apiPut, loadingPut] = usePutAPI('overlay')
  const [apiPost, loadingPost] = usePostAPI('overlay')

  return (
    <Modal
      title="เพิ่มข้อมูล"
      open={open}
      destroyOnClose
      onCancel={() => setOpen({ open: false, data: {}, type: null })}
      onOk={() => { ref_btn?.current?.click() }}
      width={700}
      okText='บันทึก'
      cancelText='ยกเลิก'
      okButtonProps={{
        loading: loadingPost || loadingPut,
        htmlType: 'submit',
        type: 'primary',
        size: 'large'
      }}
      cancelButtonProps={{
        htmlType: 'button',
        type: 'text',
        size: 'large'
      }}
    >
      <main className='my-5'>
        <Content
          type={type}
          id={data?.id || null}
          data={data}
          funcGet={funcGet}
          ref_btn={ref_btn}
          setOpen={setOpen}
        // masterProvince={masterProvince}
        />
      </main>
    </Modal>
  );
};

export default React.memo(ModalTrollway);
