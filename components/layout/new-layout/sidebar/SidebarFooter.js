import React from 'react'
import { Button } from 'antd'

const SidebarFooter = (props) => {
  const { } = props

  return (
    <div className='text-center'>
      <Button
        type='primary'
        size='large'
        block
      >
        ออกจากระบบ
      </Button>
    </div>
  )
}

export default React.memo(SidebarFooter)
