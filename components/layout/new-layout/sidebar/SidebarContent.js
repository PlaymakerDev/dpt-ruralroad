import React, { useCallback, useMemo } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  ProductOutlined,
  HomeOutlined,
  TruckOutlined,
  FileTextOutlined,
  SettingOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import { ConfigProvider, Menu } from 'antd';
import { CCTVIcon, PaperIcon, TruckIcon } from '@/components/icon'

const mappingTransaction = {
  // HomeOutlined,
  // TruckOutlined,
  // FileTextOutlined,
  // SettingOutlined,
  // VideoCameraOutlined
  ProductOutlined,
  TruckOutlined,
  PaperIcon,
  SettingOutlined,
  CCTVIcon,
  TruckIcon
}

const PageSidebar = (props) => {
  const { menu, user } = props
  const { pathname, push } = useRouter()

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
          icon: Icon(item.icon, { ...(pathname.startsWith(item.path_active) && { color: "#56E4EE" }) }),
          path: item.path,
          path_active: item.path_active,
          children: item?.path_list?.map((sub_item, sub_index) => {
            return {
              key: `${index + 1}.${sub_index + 1}`,
              label: sub_item.label,
              path: sub_item.path,
              ...(pathname !== sub_item.path && { onClick: () => push(sub_item.path) })
            }
          })
        }
      } else {
        return {
          key: `${index + 1}.0`,
          label: item.label,
          icon: Icon(item.icon, { ...(pathname.startsWith(item.path_active) && { color: "#56E4EE" }) }),
          path: item.path,
          path_active: item.path_active,
          ...(pathname !== item.path && { onClick: () => push(item.path) })
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
    <Menu
      defaultSelectedKeys={!!getPath ? [getPath?.key] : [findIndex?.key]}
      defaultOpenKeys={!!getPath ? [findSubIndex?.key] : undefined}
      items={renderItems}
      theme='dark'
      mode="inline"
      className='!bg-transparent'
    >
    </Menu>
  )
}

export default React.memo(PageSidebar)
