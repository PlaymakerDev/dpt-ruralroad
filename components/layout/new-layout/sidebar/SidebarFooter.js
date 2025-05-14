import React, { useCallback } from 'react'
import { Button, Modal } from 'antd'
// import config from '@/config'
import { useRouter } from 'next/router'

const SidebarFooter = (props) => {
  const { } = props
  const { push } = useRouter()

  // CONFIRM
  const confirmLogout = useCallback(() => {
    Modal.confirm({
      title: 'ออกจากระบบ',
      content: 'ท่านต้องการออกจากระบบหรือไม่',
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk: () => push('/api/logout'),
      onCancel: () => Modal.destroyAll()
    })
  }, [])

  return (
    <div className='px-2 py-3'>
      <Button
        htmlType='button'
        type='primary'
        size='large'
        block
        onClick={() => confirmLogout()}
      // onClick={() => {
      //   fetch(`${config.basePath}/api/logout`)
      //     .then(response => response.json())
      //     .then(data => {
      //       if (data.redirectTo) {
      //         window.location.href = data.redirectTo;
      //       }
      //     })
      //     .catch(error => {
      //       console.error('Logout error:', error);
      //       window.location.href = '/login';
      //     });
      // }}
      >
        ออกจากระบบ
      </Button>
    </div>
  )
}

export default React.memo(SidebarFooter)
