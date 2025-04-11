import React, { useCallback, useEffect, useState } from 'react'
import { Row, Col, Typography } from 'antd'
import { UserListSection, CreateUserSection } from '../components/content'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getLDAP, clearLDAP } from '@/store/features/settingSlice'
import { useAppDispatch } from '@/store/hooks'

const INIT_STATE = {
  Description: '',
  Email: '',
  FirstName: '',
  LastName: '',
  UserPrincipalName: '',
  Username: ''
}

const CreateScreen = (props) => {
  const { } = props
  const dispatch = useAppDispatch()
  const [ldapPrefil, setLdapPrefil] = useState(INIT_STATE)
  const [id, setID] = useState(null)

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getLDAP, reducerName: 'setting', reducerKey: 'user'
  })

  useEffect(() => {
    dispatch(clearLDAP({
      search: '',
      data: [],
      meta: {
        page: 1,
        page_size: 10,
        total: 0,
        page_count: 0,
        has_previous_page: false,
        has_next_page: false
      }
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getUserList = useCallback((username) => {
    apiGetData('/api/v1/users/ldap', { ...username, page: 1, page_size: data.ldap.search.page_size || 10 }, false)
  }, [apiGetData, data.ldap.search.page_size])

  const onChangePage = useCallback((page, perPage) => {
    apiGetData('/api/v1/users/ldap', { ...data.ldap.search, page: page, page_size: perPage }, false, {})
  }, [data.ldap.search, apiGetData])

  const clearData = useCallback(() => {
    apiGetData(`/api/v1/users/ldap`, { ...data.ldap.search, search: '', page: 1, page_size: 10, }, false, {})
    dispatch(clearLDAP(data.ldap))
  }, [data, apiGetData, dispatch])

  const onTableChange = useCallback((key, row) => {
    setID(key[0])
    setLdapPrefil(data.ldap.data?.find(item => item.Username === row[0]?.Username))
  }, [data])

  return (
    <section>
      <Typography.Title level={3}>เพิ่มข้อมูลผู้ใ่ช้งานใหม่</Typography.Title>
      <Row gutter={[30, 30]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
          <UserListSection
            getUserList={getUserList}
            data={data}
            loading={loading}
            onChangePage={onChangePage}
            clearData={clearData}
            // ON CHANGE ROW
            onTableChange={onTableChange}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
          <CreateUserSection
            id={id}
            data={ldapPrefil}
            loading={loading}
          />
        </Col>
      </Row>
    </section>
  )
}

export default React.memo(CreateScreen)
