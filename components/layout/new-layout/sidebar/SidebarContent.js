import React, { useCallback, useMemo } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  HomeOutlined,
  TruckOutlined,
  FileTextOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { ConfigProvider, Menu } from 'antd';

const mappingTransaction = {
  HomeOutlined,
  TruckOutlined,
  FileTextOutlined,
  SettingOutlined
}

const PageSidebar = (props) => {
  const { menu } = props
  const { pathname, push } = useRouter()

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
