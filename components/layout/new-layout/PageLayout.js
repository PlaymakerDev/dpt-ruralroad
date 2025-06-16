import React, { useState, useCallback, useMemo } from 'react'
import PageHeader from './PageHeader'
import { Drawer } from 'antd'
import { SidebarHeader as Title, SidebarContent as Content, SidebarFooter as Footer } from './sidebar';
import menu from '@/menu';
import { useAppSelector } from '@/store/hooks';
import { EXTERNAL_USER_TYPE, ROLE_TH } from '@/utils/constant';
import { useRouter } from 'next/router';

const PageLayout = (props) => {
  const { breadcrumb, extraHeader, children } = props
  // STATE
  const [open, setOpen] = useState(false)
  const [startX, setStartX] = useState(null)
  // GET REDUX
  const user = useAppSelector(state => state.user)
  const { query, pathname } = useRouter()

  const renderProfile = useMemo(() => {
    let res = [
      user?.title,
      user?.first_name,
      user?.last_name
    ]
    return res.join(' ')
  }, [user])

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

  const containerClassName = useMemo(() => {
    let _className = { section: 'pt-5 px-8 flex justify-between items-center', main: 'py-5 px-8' }
    if (pathname === '/admin/dashboard') {
      _className = { section: 'px-8 flex justify-between items-center', main: 'py-1 px-8' }
    }
    return _className
  }, [pathname])

  // console.log("===",containerClassName)

  return (
    <>
      <header>
        <PageHeader
          menu={menu}
          setOpen={setOpen}
          user={user}
        />
      </header>
      <section className={containerClassName.section}>
        {/* <section className='pt-5 px-8 flex justify-between items-center'> */}
        {!!breadcrumb && breadcrumb}
        {!!extraHeader && extraHeader}
      </section>
      {/* <main className='py-5 px-8'> */}
      <main className={containerClassName.main}>
        {children}
      </main>
      <aside
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Drawer
          title={(
            <Title
              title={renderProfile || 'Admin User'}
              description={query?.type ? EXTERNAL_USER_TYPE[query?.type] : (ROLE_TH[user.map_group_name] || 'ผู้ดูแลระบบ')}
              onClose={_onClose}
            />
          )}
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
            user={user}
          />
        </Drawer>
      </aside>
    </>
  )
}

export default React.memo(PageLayout)
