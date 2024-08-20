import React from 'react'
import { FormCreateUser } from '../form'
import { Card, Typography } from 'antd'

const CreateUserSection = (props) => {
  const { } = props

  return (
    <Card>
      <Typography.Title level={5}>เพิ่มข้อมูลผู้ใช้งาน</Typography.Title>
      <FormCreateUser />
    </Card>
  )
}

export default React.memo(CreateUserSection)
