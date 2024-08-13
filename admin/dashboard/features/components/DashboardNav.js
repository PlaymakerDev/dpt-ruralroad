import { Layout, Menu, theme } from 'antd';
import Image from 'next/image'
import DPTLogo from '@/public/images/dpt-logo2.png'
import { ProductOutlined } from '@ant-design/icons';
import Link from 'next/link';
const { Header } = Layout;
const DashboardNav = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    {
      key: 1,
      label: 'หน้าหลัก',
      icon : <ProductOutlined />
    }, {
      key: 2,
      label: 'ข้อมูลรถเข้าชั่ง',
      icon : <ProductOutlined />
    }, {
      key: 3,
      label: 'ข้อมูล',
      icon : <ProductOutlined />
    }, {
      key: 4,
      label: 'ตั้งค่าระบบ',
      icon : <ProductOutlined />
    }, {
      key: 5,
      label: 'กล้องวงจรปิด',
      icon : <ProductOutlined />
    }]
  return (

    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Link href={"/"}>
      <Image
        src={DPTLogo}
        alt='dpt-logo'
        width={50}
        height={50}
        />
        </Link>

      <Menu
        theme="dark"
        mode="horizontal"
        // defaultSelectedKeys={['2']}
        items={items}
        style={{
          flex: 1,
          minWidth: 0,
          
        }}
      />
    </Header>

  );
};
export default DashboardNav;