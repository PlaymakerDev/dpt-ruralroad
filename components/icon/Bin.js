import React from 'react'

const Bin = (props) => {
  const { width = 20, height = 20, fill = '#FFFFFF' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill={fill} {...props} xmlns="http://www.w3.org/2000/svg">
      <path d="M5.83203 17.5C5.3737 17.5 4.98148 17.3369 4.65536 17.0108C4.32925 16.6847 4.16592 16.2922 4.16536 15.8333V5H3.33203V3.33333H7.4987V2.5H12.4987V3.33333H16.6654V5H15.832V15.8333C15.832 16.2917 15.669 16.6842 15.3429 17.0108C15.0168 17.3375 14.6243 17.5006 14.1654 17.5H5.83203ZM7.4987 14.1667H9.16536V6.66667H7.4987V14.1667ZM10.832 14.1667H12.4987V6.66667H10.832V14.1667Z" fill="#FF4A4A" />
    </svg>
  )
}

export default React.memo(Bin)