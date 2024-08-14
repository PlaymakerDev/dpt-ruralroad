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
      <div className="flex flex-wrap justify-center gap-x-4 lg:justify-between">
        <div className="flex items-center gap-x-2">
          <DoubleArrowUp />
          <Typography.Text>
            สรุปรายงานผลการกำกับน้ำหนักยานพาหนะ สถานีตรวจสอบน้ำหนัก/หน่วยชั่งพาหนะเคลื่อนที่
          </Typography.Text>
        </div>
        <Typography.Text>
          ปีงบประมาณ 2557 - ปัจจุบัน
        </Typography.Text>
      </div>


    </Footer>

  )

}

export default DashboardFooter