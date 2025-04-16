import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
// import { useAppDispatch } from '@/store/hooks'
// import { signOut } from '@/store/features/userSlice'
import { Modal, ConfigProvider } from 'antd'
import config from '@/config'
import useEffectOne from '@/utils/hooks/useEffectOne'
// import useTrans from '@/utils/hooks/useTrans'

const SessionExpired = () => {
  const { replace, push, locale } = useRouter()
  const [modal, contextHolder] = Modal.useModal();
  // const dispatch = useAppDispatch()
  // const tran = useTrans()

  useEffectOne(() => {
    Modal.warning({
      title: 'เซสชั่นหมดอายุ',
      content: 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
      onOk: () => {
        localStorage.clear();
        fetch(`${config.basePath}/api/logout`)
          .then(response => response.json())
          .then(data => {
            if (data.redirectTo) {
              window.location.href = data.redirectTo;
            } else {
              window.location.href = '/login';
            }
          })
          .catch(error => {
            console.error('Logout error:', error);
            window.location.href = '/login';
          });
      },
      okText: 'ดำเนินการต่อ',
    })
  }, [replace])

  // useEffect(() => {
  //   modal.warning({
  //     // title: <h3 className='txt-bold m-0'>{tran.session_timeout}</h3>,
  //     title: 'เซสชั่นหมดอายุ',
  //     content: 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
  //     onOk: () => {
  //       // dispatch(signOut(null))
  //       localStorage.clear();
  //       replace(`${config.basePath}/api/logout`)
  //     },
  //     okText: 'ดำเนินการต่อ',
  //     // okButtonProps: {
  //     //   type: 'primary',
  //     //   style: {
  //     //     backgroundColor: '#C10022'
  //     //   }
  //     // },
  //   })
  // }, [modal, replace])

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: '#ffffff',
            footerBg: 'transparent',
            headerBg: '#ffffff',
            titleColor: 'rgba(0, 0, 0, 0.88)',
            titleFontSize: 16,
            titleLineHeight: '1.5',
          },
          Button: {
            colorPrimary: '#00EEFF88',
            colorTextHeading: '#FFFFFF',
            colorTextDescription: '#FFFFFF',
            colorText: '#FFFFFF',
          },
        },
      }}
    >
      {contextHolder}
    </ConfigProvider>
  )
}

export default SessionExpired
