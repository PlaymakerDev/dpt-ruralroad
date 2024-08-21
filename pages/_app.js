import React from "react";
import { ConfigProvider } from "antd";
import theme from '@/theme/themeConfig'
import "@/styles/globals.css";

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
          token: {
            fontSize: 14,
            colorPrimary: '#FFFFFF',
            fontFamily: 'IBMPlexSansThai-Regular'
          }
        }}
      >
        {children}
      </ConfigProvider>
    )
  },
})

const App = (props) => {
  const { Component, pageProps } = props;

  return (
    <ConfigProvider theme={theme}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default App
