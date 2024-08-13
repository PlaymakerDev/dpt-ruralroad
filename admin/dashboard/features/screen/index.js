import DashboardNav from '../components/DashboardNav'
import { Layout } from 'antd';
import DashboardContent from '../components/DashboardContent';
import { Typography } from "antd";
import DesktopLayout from '../components/DasktopLayout';
import TabletLayout from '../components/TabletLayout';
import MobileLayout from '../components/MobileLayout';

const DashboardScreen = () => {

  const bgColor = '#001529'
  return (
    <main className=' w-full h-screen '>
      <Layout >
        <DashboardNav />
        <DashboardContent>
          <DesktopLayout />
          <TabletLayout />
          <MobileLayout />
        </DashboardContent>
      </Layout>
    </main>
  )
}

export default DashboardScreen