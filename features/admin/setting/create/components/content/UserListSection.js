import React from 'react'
import { Card } from 'antd'
import { FormSearchUser } from '../form'
import { TableUser } from '../table'

const UserListSection = (props) => {
  const { getUserList, data, loading, onChangePage, clearData, onTableChange } = props

  return (
    <Card>
      <section>
        <FormSearchUser
          // FUNCTION GET DATA
          getUserList={getUserList}
          clearData={clearData}
        />
      </section>
      <section className='mt-5'>
        <TableUser
          // API DATA
          data={data.ldap.data}
          loading={loading}
          // PAGE API
          page={data.ldap.search.page}
          perPage={data.ldap.search.page_size}
          total={data.ldap.meta.total}
          onChange={onChangePage}
          onTableChange={onTableChange}
        />
      </section>
    </Card>
  )
}

export default React.memo(UserListSection)
