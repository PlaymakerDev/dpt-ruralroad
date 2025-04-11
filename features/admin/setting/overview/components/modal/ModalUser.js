import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Modal, Row, Col, message } from "antd";
import { Form, Field, useForm } from "@/components/form";
// import { useRouter } from 'next/router'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import usePutAPI from '@/utils/hooks/api/usePutAPI'
import { getDepartmentAll, getUserGroup, getUserRole, getPrefix } from '@/store/features/masterSlice'
import { getRole } from '@/store/features/settingSlice'

const Content = (props) => {
  const { info, setOpen, refSubmit, onReload } = props;
  const [apiPut, loadingPut] = usePutAPI('overlay')
  const [apiGetDepartment, loadDepartment, department] = useGetAPI('overlay', {
    funcDispatch: getDepartmentAll, reducerName: 'master', reducerKey: 'departments'
  })

  const [apiGetUserGroup, loadUserGroup, userGroup] = useGetAPI('overlay', {
    funcDispatch: getUserGroup, reducerName: 'master', reducerKey: 'user_group'
  })

  const [apiGetUserRole, loadUserRole, userRole] = useGetAPI('overlay', {
    funcDispatch: getUserRole, reducerName: 'master', reducerKey: 'user_role'
  })

  const [apiGetUserPosition, loadUserPosition, userPosition] = useGetAPI('overlay', {
    funcDispatch: getRole, reducerName: 'setting', reducerKey: 'role'
  })

  const [apiGetUserPrefix, loadUserPrefix, userPrefix] = useGetAPI('overlay', {
    funcDispatch: getPrefix, reducerName: 'master', reducerKey: 'prefix'
  })

  useEffect(() => {
    apiGetDepartment('/api/v1/masters/departments_all', {}, false, {})
    apiGetUserGroup('/api/v1/masters/user_group', { ...userGroup.overview.search }, false, {})
    apiGetUserRole('/api/v1/masters/user_role', { ...userRole.overview.search }, false, {})
    apiGetUserPosition('/api/v1/masters/user_position', { ...userPosition.overview.search }, false, {})
    apiGetUserPrefix('/api/v1/masters/user_title', { ...userPrefix.search }, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderDepartment = useMemo(() => {
    let data = []
    if (!!department.all.data) {
      data = department.all.data?.map(item => ({
        ...item,
        id: String(item.id)
      }))
    }
    return data
  }, [department])

  const form = useForm({
    initialValues: {
      username: info?.username || '',
      title: info?.title || '',
      first_name: info?.first_name || '',
      last_name: info?.last_name || '',
      group_name: info?.group_name || '',
      dept_id: info?.dept_id?.toString() || '',
      dept_group: info?.dept_group || '',
      dept_type: info?.dept_type || '',
      position: info?.position || '',
      role: info?.role || ''
    },
    rules: {},
    blackList: ['username']
  });

  const { handlerChange } = form

  const buildValue = useCallback((values, next) => {
    const body = {
      username: values.username,
      title: values.title,
      first_name: values.first_name,
      last_name: values.last_name,
      group_name: values.group_name,
      dept_id: Number(values.dept_id),
      dept_group: Number(values.dept_group),
      dept_type: Number(values.dept_type),
      position: Number(values.position),
      role: Number(values.role)
    }
    next(body)
  }, []);

  const handlerSubmit = useCallback(async (values) => {
    const response = await apiPut('/api/v1/users', values, {}, false)
    if (response?.success) {
      message.success('แก้ไขข้อมูลสำเร็จ')
      setOpen({ open: false, info: {} })
      onReload()
    } else {
      message.error('ไม่สามารถแก้ไขข้อมูลได้')
    }
  }, [apiPut, setOpen, onReload])

  return (
    <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
      <section>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Field.Input
              label='Username'
              name='username'
              placeholder='Username'
              hideRequired
            />
          </Col>
        </Row>
      </section>
      <section className="mt-3">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Field.Select
              label='คำนำหน้า'
              name='title'
              placeholder='คำนำหน้า'
              optKeys={['title', 'title']}
              options={userPrefix.data || []}
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              hideRequired
            />
            {/* <Field.Input
              label='คำนำหน้า'
              name='title'
              placeholder='คำนำหน้า'
              hideRequired
            /> */}
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Field.Input
              label='ชื่อ'
              name='first_name'
              placeholder='ชื่อ'
              hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Field.Input
              label='นามสกุล'
              name='last_name'
              placeholder='นามสกุล'
              hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
            <Field.Select
              label="หน่วยงาน"
              name="dept_id"
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
                  dept_group: renderDepartment?.find((item) => item?.id === v)?.group,
                  dept_type: renderDepartment?.find((item) => item?.id === v)?.type,
                })
              }}
              hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Field.Select
              label='สิทธิ์การเข้าใช้งาน'
              name='group_name'
              placeholder='สิทธิ์การเข้าใช้งาน'
              optKeys={['group_name', 'group_description']}
              options={userGroup.overview.data || []}
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
            <Field.Select
              label='ตำแหน่ง'
              name='position'
              placeholder='ตำแหน่ง'
              optKeys={['pid', 'p_name']}
              options={userPosition.overview.data || []}
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Field.Select
              label='หน้าที่'
              name='role'
              placeholder='หน้าที่'
              optKeys={['rid', 'role']}
              options={userRole.overview.data || []}
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              hideRequired
            />
          </Col>
        </Row>
      </section>
      <button ref={refSubmit} type="submit" hidden />
    </Form>
  );
};

const ModalUser = (props) => {
  const { open, info, setOpen, onReload } = props;
  const [apiPut, loadingPut] = usePutAPI('overlay')
  const refSubmit = useRef(null)

  return (
    <Modal
      title="เพิ่มข้อมูลผู้ใช้งาน"
      open={open}
      destroyOnClose
      onCancel={() => setOpen({ open: false, info: {} })}
      width={700}
      okText='บันทึก'
      cancelText='ยกเลิก'
      okButtonProps={{
        htmlType: 'submit',
        type: 'primary',
        size: 'large',
        loading: loadingPut,
        onClick: () => refSubmit.current.click()
      }}
      cancelButtonProps={{
        htmlType: 'button',
        type: 'text',
        size: 'large'
      }}
    >
      <main className='my-5'>
        <Content
          info={info}
          setOpen={setOpen}
          refSubmit={refSubmit}
          onReload={onReload}
        />
      </main>
    </Modal>
  );
};

export default React.memo(ModalUser);
