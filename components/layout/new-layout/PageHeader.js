import React, { useMemo, useCallback, useState, useEffect } from 'react'
import { Avatar, Typography, Menu } from 'antd'
import { HomeOutlined, TruckOutlined, FileTextOutlined, SettingOutlined, UserOutlined, CalendarOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import Image from 'next/image'
import DPTLogo from '@/public/images/dpt-logo.svg'
import styles from '@/styles/components/layout/new-layout/Layout.module.css'

const mappingTransaction = {
  HomeOutlined,
  TruckOutlined,
  FileTextOutlined,
  SettingOutlined
}

const PageHeader = (props) => {
  const { menu, setOpen } = props
  const { pathname, asPath, reload, push } = useRouter()
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 1061);
    };

    // Check on mount
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Icon = useCallback((iconName, { ...props }) => {
    const IconResult = mappingTransaction[iconName]
    if (typeof IconResult !== 'undefined') {
      return <IconResult {...props} />
    }
    return
  }, [])

  const renderItems = useMemo(() => {
    const newList = menu['ADMIN']?.map((item, index) => {
      if (!!item.path_list?.length) {
        return {
          key: `${index + 1}.0`,
          label: item.label,
          icon: Icon(item.icon, {}),
          path: item.path,
          children: item?.path_list?.map((sub_item, sub_index) => {
            return {
              key: `${index + 1}.${sub_index + 1}`,
              label: sub_item.label,
              path: sub_item.path,
              onClick: () => push(sub_item.path)
            }
          })
        }
      } else {
        return {
          key: `${index + 1}.0`,
          label: item.label,
          icon: Icon(item.icon, {}),
          path: item.path,
          onClick: () => push(item.path)
        }
      }
    })
    return newList
  }, [menu, push, Icon])

  // GET PATH LIST
  const findIndex = renderItems?.find(item => item.path === pathname)
  const findSubIndex = renderItems?.find(item => item.children?.find(sub_item => sub_item.path === pathname))
  const getPath = findSubIndex?.children?.find(item => item.path === pathname)

  return (
    <nav className={styles.navbar}>
      <section className='flex items-center justify-between px-8 py-5'>
        <div className='flex flex-wrap items-center gap-5'>
          <Image
            src={DPTLogo}
            width={53}
            height={53}
            alt='logo'
          />
          {isVisible &&
            <div className={styles.navbarMenu}>
              <Menu
                defaultSelectedKeys={!!getPath ? [getPath?.key] : [findIndex?.key]}
                items={renderItems}
                theme='dark'
                mode="horizontal"
                className='!bg-transparent !flex-1 !m-0'
                triggerSubMenuAction='click'
              />
            </div>
          }
        </div>
        <div className={styles.navbarExtraMenu}>
          <div className='flex items-center gap-3'>
            <div className='flex flex-col items-end'>
              <Typography.Text>26 ก.ค. 2567</Typography.Text>
              <Typography.Text>วันที่</Typography.Text>
            </div>
            <Avatar
              size={'large'}
              icon={<CalendarOutlined />}
              className={`${styles.avatarIcon} !bg-[#FFFFFF30]`}
            />
          </div>
          <div className='flex items-center gap-3'>
            <div className='flex flex-col items-end'>
              <Typography.Text>Admin User</Typography.Text>
              <Typography.Text>ผู้ดูแลระบบ</Typography.Text>
            </div>
            <Avatar
              size={'large'}
              icon={<UserOutlined />}
              className={`${styles.avatarIcon} !bg-[#FFFFFF30]`}
            />
          </div>
          <div>
            <Avatar
              size={'large'}
              icon={<LogoutOutlined />}
              className={`${styles.avatarIcon} !bg-[#FFFFFF30] !cursor-pointer`}
            />
          </div>
        </div>
        <div className={styles.menuButton}>
          <MenuOutlined
            className='!cursor-pointer !text-[#FFFFFF] !text-lg'
            onClick={() => setOpen(true)}
          />
        </div>
      </section>
    </nav>
  )
}

export default React.memo(PageHeader)
