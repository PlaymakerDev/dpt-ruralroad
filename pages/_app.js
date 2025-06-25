import React, { createContext, useState } from "react";
import "@/styles/globals.css";
// REACT REDUX-PROVIDER
import { wrapper } from '@/store'
import { Provider } from "react-redux";
// ANTD PROVIDER
import { ConfigProvider } from "antd";
import theme from '@/theme/themeConfig'
import Head from 'next/head';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// STATIC CONFIG
ConfigProvider.config({
  holderRender: (children) => {
    return (
      <ConfigProvider
        prefixCls="ant"
        iconPrefixCls="anticon"
        theme={{
          components: {
            Button: {
              // HOVER
              defaultHoverBorderColor: '#4096ff',
              defaultHoverColor: '#4096ff',
              defaultHoverBg: '#ffffff',
              colorPrimaryHover: '#4096ff',
              // ACTIVE
              defaultActiveBg: '#ffffff',
              defaultActiveBorderColor: '#0958d9',
              defaultActiveColor: '#0958d9',
              colorBgTextActive: 'rgba(0, 0, 0, 0.15)',
              colorPrimaryActive: '#0958d9',
              // PRIMARY
              primaryColor: '#ffffff',
              colorPrimary: '#0075E9',
              colorPrimaryBorder: '#91caff',
            }
          },
          token: {
            fontSize: 14,
            colorPrimary: '#FFFFFF',
            fontFamily: 'IBM Plex Sans Thai'
          }
        }}
      >
        {children}
      </ConfigProvider>
    )
  },
})

// export const OverWeightVehicleTab = createContext();
export const TruckDetail = createContext();

export const CctvID = createContext();


const App = ({ Component, ...rest }) => {

  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const [truckDetail, setTruckDetail] = useState({
    brand: '',
    lp_head_no: '',
    lp_head_province_id: 0,
    lp_tail_no: '',
    lp_tail_province_id: 0,
    is_arrested: '',
    td_id: ''

  })
  const [cctvID, setCctvID] = useState()
  const [cctvPage,setCctvPage] = useState()
  // const [vehicleMenuTab,setVehicleMenuTab] = useState('stationary')
  // const [dataReturn,setDataReturn] = useState(
  //   {
  //     isdata : false,
  //     yearplan : '',
  //     startdate : '',
  //     enddate : '',
  //     department : ''
  //   }
  // )

  return (
    <Provider store={store}>
      <Head>
        <title>ระบบตรวจสอบยานพาหนะ - กรมทางหลวงชนบท</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ConfigProvider theme={theme}>
        {/* <OverWeightVehicleTab.Provider value={{vehicleMenuTab,setVehicleMenuTab,dataReturn,setDataReturn}}> */}
        <TruckDetail.Provider value={{ truckDetail, setTruckDetail }}>
          <CctvID.Provider value={{ cctvID, setCctvID ,cctvPage,setCctvPage}}>
            <Component {...pageProps} />
          </CctvID.Provider>
        </TruckDetail.Provider>
        {/* </OverWeightVehicleTab.Provider> */}
      </ConfigProvider>
    </Provider>
  );
}

export default App
