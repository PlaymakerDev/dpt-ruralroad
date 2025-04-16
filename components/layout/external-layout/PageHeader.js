import React, { useMemo, useCallback, useState, useEffect } from 'react'
import { Avatar, Typography, Menu } from 'antd'
import { TruckOutlined, SettingOutlined, UserOutlined, CalendarOutlined, LogoutOutlined, MenuOutlined, ProductOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import Image from 'next/image'
import DPTLogo from '@/public/images/dpt-logo.svg'
import styles from '@/styles/components/layout/new-layout/Layout.module.css'
import { CCTVIcon, PaperIcon, TruckIcon } from '@/components/icon'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { EXTERNAL_USER_TYPE } from '@/utils/constant'
import config from '@/config'

dayjs.extend(buddhistEra)
dayjs.extend(customParseFormat);

const mappingTransaction = {
  ProductOutlined,
  TruckOutlined,
  PaperIcon,
  SettingOutlined,
  CCTVIcon,
  TruckIcon
}

const PageHeader = (props) => {
  const { menu, setOpen, user } = props
  const { pathname, asPath, reload, push, replace, query } = useRouter()
  const [isVisible, setIsVisible] = useState(false);

  const renderProfile = useMemo(() => {
    let res = [
      user?.title,
      user?.first_name,
      user?.last_name
    ]
    return res.join(' ')
  }, [user])

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
    const newList = menu[user?.map_group_name]?.map((item, index) => {
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
  }, [menu, push, Icon, user])

  // GET PATH LIST
  const findIndex = renderItems?.find(item => item.path === pathname)
  const findSubIndex = renderItems?.find(item => item.children?.find(sub_item => sub_item.path === pathname))
  const getPath = findSubIndex?.children?.find(item => item.path === pathname)

  return (
    <nav className={styles.navbar}>
      <section className='flex items-center justify-between px-8 py-5'>
        <div className='flex flex-wrap items-center gap-5 flex-grow'>
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
              <Typography.Text>{dayjs().locale('th').format('DD MMM BBBB')}</Typography.Text>
              <Typography.Text className='!text-[#FFFFFF80]'>วันที่</Typography.Text>
            </div>
            <Avatar
              size={'large'}
              icon={<CalendarOutlined />}
              className={`${styles.avatarIcon} !bg-[#FFFFFF30]`}
            />
          </div>
          <div className='flex items-center gap-3'>
            <div className='flex flex-col items-end'>
              <Typography.Text>{renderProfile || 'Admin User'}</Typography.Text>
              <Typography.Text className='!text-[#FFFFFF80]'>{EXTERNAL_USER_TYPE[query?.type] || 'ผู้ดูแลระบบ'}</Typography.Text>
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
              onClick={() => {
                fetch(`${config.basePath}/api/logout`)
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
