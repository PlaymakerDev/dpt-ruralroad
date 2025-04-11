import React from 'react'

const Success = (props) => {
  const { width = 65, height = 65, fill = '#FFFFFF' } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 65 65" fill={fill} {...props} >
      <g opacity="0.2" filter="url(#filter0_d_1166_45419)">
        <rect x={12} y={12} width={41} height={41} rx="20.5" fill="#14AE5C" />
      </g>
      <path d="M42.1453 32.4984C42.1453 37.8263 37.8263 42.1453 32.4984 42.1453C27.1706 42.1453 22.8516 37.8263 22.8516 32.4984C22.8516 27.1706 27.1706 22.8516 32.4984 22.8516C37.8263 22.8516 42.1453 27.1706 42.1453 32.4984Z" fill="white" />
      <path d="M32.4963 20.4375C25.8399 20.4375 20.4375 25.8399 20.4375 32.4963C20.4375 39.1528 25.8399 44.5551 32.4963 44.5551C39.1528 44.5551 44.5551 39.1528 44.5551 32.4963C44.5551 25.8399 39.1528 20.4375 32.4963 20.4375ZM29.2284 37.6696L24.8993 33.3404C24.7876 33.2288 24.6991 33.0963 24.6386 32.9504C24.5782 32.8045 24.5471 32.6482 24.5471 32.4903C24.5471 32.3324 24.5782 32.1761 24.6386 32.0302C24.6991 31.8843 24.7876 31.7518 24.8993 31.6401C25.0109 31.5285 25.1434 31.4399 25.2893 31.3795C25.4352 31.3191 25.5915 31.288 25.7494 31.288C25.9073 31.288 26.0636 31.3191 26.2095 31.3795C26.3554 31.4399 26.4879 31.5285 26.5996 31.6401L30.0846 35.1131L38.381 26.8166C38.6065 26.5911 38.9123 26.4645 39.2312 26.4645C39.55 26.4645 39.8559 26.5911 40.0813 26.8166C40.3068 27.0421 40.4335 27.3479 40.4335 27.6668C40.4335 27.9856 40.3068 28.2914 40.0813 28.5169L30.9287 37.6696C30.8171 37.7814 30.6846 37.87 30.5387 37.9306C30.3928 37.9911 30.2365 38.0222 30.0785 38.0222C29.9206 38.0222 29.7642 37.9911 29.6183 37.9306C29.4725 37.87 29.3399 37.7814 29.2284 37.6696Z" fill="#14AE5C" />
      <defs>
        <filter id="filter0_d_1166_45419" x={0} y={0} width={65} height={65} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation={6} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.467532 0 0 0 0.12 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1166_45419" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1166_45419" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}

export default React.memo(Success)