import React, { useEffect, useMemo, useState } from 'react'
import { FormCreateUser } from '../form'
import { Card, Spin, Typography } from 'antd'

const CreateUserSection = (props) => {
  const { id, data, loading } = props
  const [updateID, setUpdateID] = useState(false);

  useEffect(() => {
    if (id) {
      setUpdateID(true);

      const timer = setTimeout(() => {
        setUpdateID(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [id]);

  const renderCreateUser = useMemo(() => {
    if (!updateID) {
      return (
        <FormCreateUser
          data={data}
        />
      )
    } else {
      return <Spin spinning />
    }
  }, [updateID, data])

  return (
    <Card>
      <Typography.Title level={5}>เพิ่มข้อมูลผู้ใช้งาน</Typography.Title>
      {renderCreateUser}
    </Card>
  )
}

export default React.memo(CreateUserSection)
