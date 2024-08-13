import DoubleArrowUp from '@/public/DoubleArrowUp';
import { Layout, Typography } from 'antd';

const { Footer } = Layout;
const DashboardFooter = () => {
  return (

<Footer
  style={{
    marginTop: 20,
    borderRadius: 10,
    textAlign: 'center',
  }}
>
  <div className="flex flex-wrap justify-between ">
    <div className="flex items-center">
      <DoubleArrowUp />
      <Typography.Text>
        สรุปรายงานผลการกำกับน้ำหนักยานพาหนะ สถานีตรวจสอบน้ำหนัก/หน่วยชั่งพาหนะเคลื่อนที่
      </Typography.Text>
    </div>

    <div className="flex  justify-center">
      <Typography.Text>
        ปีงบประมาณ 2557 - ปัจจุบัน
      </Typography.Text>
    </div>
  </div>
</Footer>

  )

}

export default DashboardFooter