import { Breadcrumb } from 'antd';
import styles from '@/features/orgsetupplan/style/osp.module.css';

const OspBreadcrumb = () => {
  return (
    <Breadcrumb className='text-white' separator={<span style={{ color: 'white' }}> / </span>}>
      <Breadcrumb.Item className='text-white'>ข้อมูล</Breadcrumb.Item>
      <Breadcrumb.Item className='text-white'>แผนการจัดตั้งหน่วย</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default OspBreadcrumb;
