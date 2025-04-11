import React, { useCallback, useEffect, useMemo } from 'react'
import { Field, Form, useForm } from '@/components/form'
import { Row, Col, Button, message } from 'antd'
import { useRouter } from 'next/router'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import usePostAPI from '@/utils/hooks/api/usePostAPI'
import { getDepartmentAll, getUserGroup, getUserRole } from '@/store/features/masterSlice'
import { getRole } from '@/store/features/settingSlice'

const FormCreateUser = (props) => {
  const { data } = props
  const router = useRouter()
  const [apiPost, loadingPost] = usePostAPI('overlay')
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

  useEffect(() => {
    apiGetDepartment('/api/v1/masters/departments_all', {}, false, {})
    apiGetUserGroup('/api/v1/masters/user_group', { ...userGroup.overview.search }, false, {})
    apiGetUserRole('/api/v1/masters/user_role', { ...userRole.overview.search }, false, {})
    apiGetUserPosition('/api/v1/masters/user_position', { ...userPosition.overview.search }, false, {})
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

  const nameDestructure = useMemo(() => {
    const prefixList = ['นาย', 'นาง', 'นางสาว'];
    const destructure = data?.Description?.split(' ')

    if (destructure?.length === 2) {
      let prefix = '';
      let firstname = destructure[0];
      const lastname = destructure[1];

      for (let p of prefixList) {
        if (firstname.startsWith(p)) {
          prefix = p;
          firstname = firstname.slice(p.length)
          break;
        }
      }

      return {
        prefix,
        firstname,
        lastname
      };
    }

    return {
      prefix: '',
      firstname: '',
      lastname: ''
    }
  }, [data.Description])

  const form = useForm({
    initialValues: {
      username: data?.Username || '',
      prefix: nameDestructure.prefix || '',
      first_name: nameDestructure.firstname || '',
      last_name: nameDestructure.lastname || '',
      department: '',
      permission: '',
      position: '',
      role: ''
    },
    rules: {},
    blackList: ['username', 'prefix', 'first_name', 'last_name']
  })

  const { handlerChange } = form

  const buildValue = useCallback((values, next) => {
    const body = {
      username: values.username,
      title: values.prefix,
      first_name: values.first_name,
      last_name: values.last_name,
      group_name: values.permisison,
      dept_id: Number(values.department),
      dept_group: Number(values.dept_group),
      dept_type: Number(values.dept_type),
      position: Number(values.position),
      role: Number(values.role)
    }
    next(body)
  }, [])

  const handlerSubmit = useCallback(async (values) => {
    const response = await apiPost('/api/v1/users', values, {}, false);
    if (response?.success) {
      router.push('/admin/setting/overview');
      message.success('บันทึกข้อมูลสำเร็จ');
    } else if (response?.response?.data?.message === 'Username already exist') {
      message.error('มีผู้ใช้งานในระบบแล้ว');
    } else {
      message.error('ไม่สามารถบันทึกข้อมูลได้');
    }    
  }, [apiPost, router])
  
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
      <section className='mt-3'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Field.Input
              label='คำนำหน้า'
              name='prefix'
              placeholder='คำนำหน้า'
              hideRequired
            />
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
              name='permisison'
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
      <section className='mt-5 block sm:flex sm:justify-end sm:items-center sm:gap-3'>
        <Button
          type='primary'
          htmlType='submit'
          size='large'
          className='!w-full lg:!w-auto'
        >
          บันทึก
        </Button>
        <Button
          type='text'
          htmlType='button'
          size='large'
          className='!w-full lg:!w-auto'
          onClick={() => router.back()}
        >
          ยกเลิก
        </Button>
      </section>
    </Form>
  )
}

export default React.memo(FormCreateUser)
