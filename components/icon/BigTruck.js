import React from 'react'

const Bigtruck = (props) => {
  const { width = 228, height = 46, fill = '#FFFFFF' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 228 46" fill={fill} {...props} xmlns="http://www.w3.org/2000/svg">
      <rect x="148.695" width="79.3043" height="40.4783" fill="#EBEBEB" />
      <rect x="142.086" y="29.7393" width="9.91304" height="3.30435" fill="#EBEBEB" />
      <rect x="142.086" y="37.1738" width="9.91304" height="3.30435" fill="#EBEBEB" />
      <rect x="35.9609" width="106.127" height="40.3457" fill="#EBEBEB" />
      <rect x="2.06522" y="31.0086" width="69.5443" height="7.27161" fill="#EBEBEB" stroke="#EBEBEB" strokeWidth="4.13043" />
      <circle cx="85.1198" cy="35.9323" r="5.69644" fill="#EBEBEB" stroke="#9E9E9E" strokeWidth="8.26087" />
      <circle cx="85.2807" cy="36.0932" r="1.75145" stroke="white" strokeWidth="1.65217" />
      <circle cx="106.061" cy="35.9323" r="5.69644" fill="#EBEBEB" stroke="#9E9E9E" strokeWidth="8.26087" />
      <circle cx="106.222" cy="36.0932" r="1.75145" stroke="white" strokeWidth="1.65217" />
      <circle cx="126.362" cy="35.9323" r="5.69644" fill="#EBEBEB" stroke="#9E9E9E" strokeWidth="8.26087" />
      <circle cx="126.523" cy="36.0932" r="1.75145" stroke="white" strokeWidth="1.65217" />
      <circle cx="210.565" cy="35.9323" r="5.69644" fill="#EBEBEB" stroke="#9E9E9E" strokeWidth="8.26087" />
      <circle cx="210.726" cy="36.0932" r="1.75145" stroke="white" strokeWidth="1.65217" />
      <rect x="22.5547" y="6.45117" width="8.37701" height="33.508" fill="#EBEBEB" />
      <path d="M0 19.0741L10.4713 6.45117H22.5535V39.9592H0V19.0741Z" fill="#EBEBEB" />
      <circle cx="16.6664" cy="35.9603" r="2.63124" fill="#EBEBEB" />
      <circle cx="16.6664" cy="35.9603" r="2.63124" fill="#EBEBEB" />
      <circle cx="16.6664" cy="35.9603" r="2.63124" fill="#EBEBEB" />
      <circle cx="16.6664" cy="35.9603" r="2.63124" fill="#EBEBEB" />
      <circle cx="16.6664" cy="35.9603" r="2.63124" fill="#EBEBEB" />
      <circle cx="16.6664" cy="35.9603" r="2.63124" fill="#EBEBEB" />
      <circle cx="16.6664" cy="35.9603" r="2.63124" fill="#EBEBEB" />
      <rect x="13.0469" y="8.0625" width="9.34358" height="11.2767" fill="#9E9E9E" />
      <path d="M12.8572 8.0625L22.2301 19.3392H3.54297L12.8572 8.0625Z" fill="#9E9E9E" />
      <circle cx="15.948" cy="35.9323" r="5.69644" fill="#EBEBEB" stroke="#9E9E9E" strokeWidth="8.26087" />
      <circle cx="16.1088" cy="36.0932" r="1.75145" stroke="white" strokeWidth="1.65217" />
    </svg>
  )
}

export default React.memo(Bigtruck)