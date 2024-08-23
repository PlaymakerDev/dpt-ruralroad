import React, { useState, useCallback } from 'react'
import PageHeader from './PageHeader'
import { Drawer } from 'antd'
import { SidebarHeader as Title, SidebarContent as Content, SidebarFooter as Footer } from './sidebar';
import menu from '@/menu';

const PageLayout = (props) => {
  const { breadcrumb, children } = props
  // STATE
  const [open, setOpen] = useState(false)
  const [startX, setStartX] = useState(null)

  const _onClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleTouchStart = useCallback((e) => {
    setStartX(e.touches[0].clientX);
  }, [])

  const handleTouchMove = useCallback((e) => {
    if (startX !== null) {
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - startX;

      // Assuming a swipe threshold of 50 pixels
      if (deltaX > 50) {
        setOpen(false);
      }
    }
  }, [startX])

  const handleTouchEnd = useCallback(() => {
    setStartX(null);
  }, [])

  return (
    <>
      <header>
        <PageHeader
          menu={menu}
          setOpen={setOpen}
        />
      </header>
      <section className='pt-5 px-8'>
        {breadcrumb}
      </section>
      <main className='py-5 px-8'>
        {children}
      </main>
      <aside
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Drawer
          title={<Title title='Admin User' description='ผู้ดูแลระบบ' />}
          closeIcon={false}
          open={open}
          onClose={_onClose}
          styles={{
            header: {
              backgroundColor: '#4CCAD220'
            },
          }}
          footer={<Footer />}
          destroyOnClose
        >
          <Content
            menu={menu}
            setOpen={setOpen}
          />
        </Drawer>
      </aside>
    </>
  )
}

export default React.memo(PageLayout)
