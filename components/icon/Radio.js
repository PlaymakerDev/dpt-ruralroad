import React from 'react';

const Radio = ({ size = 20, active = 0, radioID = null, onClick }) => {
  const isActive = radioID === active;

  
  const handleClick = () => {
    console.log('func ',onClick)
    if (typeof onClick === 'function') {
      onClick(radioID); // เรียกใช้งานฟังก์ชันที่ถูกส่งมา
    }
  };


  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleClick} // ใช้ handleClick ที่ตรวจสอบ onClick ก่อน
      style={{ cursor: 'pointer' }}
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke={isActive ? 'blue' : 'grey'}
        strokeWidth="6"
        fill="white"
      />
      {isActive && (
        <circle
          cx="50"
          cy="50"
          r="30"
          stroke="white"
          strokeWidth="6"
          fill="blue"
        />
      )}
    </svg>
  );
};

export default React.memo(Radio);
