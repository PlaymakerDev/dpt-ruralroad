import React from 'react'
import { Card } from 'antd'
import { FormSearchUser } from '../form'
import { TableUser } from '../table'

const UserListSection = (props) => {
  const { } = props

  return (
    <Card>
      <section>
        <FormSearchUser />
      </section>
      <section className='mt-5'>
        <TableUser />
      </section>
    </Card>
  )
}

export default React.memo(UserListSection)
