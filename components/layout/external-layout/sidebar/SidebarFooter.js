import React from 'react'
import { Button } from 'antd'
import config from '@/config'

const SidebarFooter = (props) => {
  const { router } = props
  const { push, replace } = router;

  return (
    <div className='text-center'>
      <Button
        htmlType='button'
        type='primary'
        size='large'
        block
        onClick={() => {
          fetch('/api/logout')
            .then(response => response.json())
            .then(data => {
              if (data.redirectTo) {
                window.location.href = data.redirectTo;
              }
            })
            .catch(error => {
              console.error('Logout error:', error);
              window.location.href = '/login';
            });
        }}
      >
        ออกจากระบบ
      </Button>
    </div>
  )
}

export default React.memo(SidebarFooter)
