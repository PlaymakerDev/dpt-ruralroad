import DashboardNav from '../components/DashboardNav'
import { Layout } from 'antd';
import DashboardContent from '../components/DashboardContent';
import DashboardLayout from '../layout/DashboardLayout';

const DashboardScreen = () => {

  return (
    <main className=' w-full h-screen '>
      <Layout >
        <DashboardNav />
        <DashboardContent>
          <DashboardLayout />
        </DashboardContent>
      </Layout>
    </main>
  )
}

export default DashboardScreen