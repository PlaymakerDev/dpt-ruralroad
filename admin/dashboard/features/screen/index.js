import DashboardNav from '../components/DashboardNav'
import { Layout } from 'antd';
import DashboardContent from '../components/DashboardContent';
import { Typography } from "antd";  

const DashboardScreen = () => {

  const bgColor = '#001529'
  return (
    <main className=' w-full h-screen '>
      <Layout >
        <DashboardNav />
      
      <DashboardContent>
      <Typography.Title className='text-center'>Desktop</Typography.Title>
      <div className='grid grid-cols-5 grid-rows-4 gap-2 w-full border-2 border-black mx-auto -lg justify-items-center h-96'>
        <div className='bg-blue-500 flex items-center justify-center text-white col-span-3 w-full h-full'>1</div>
        <div className='bg-blue-500 flex items-center justify-center text-white col-span-2 row-span-2 w-full h-full'>2</div>
        <div className='bg-blue-500 flex items-center justify-center text-white col-span-1 row-span-3 w-full h-full'>3</div>
        <div className='bg-blue-500 flex items-center justify-center text-white col-span-2 row-span-1 w-full h-full'>4</div>
        <div className='bg-blue-500 flex items-center justify-center text-white col-span-2 row-span-2 w-full h-full'>5</div>
        <div className='bg-blue-500 flex items-center justify-center text-white col-span-1 row-span-1 w-full h-full'>6</div>
        <div className='bg-blue-500 flex items-center justify-center text-white col-span-1 row-span-1 w-full h-full'>7</div>
        <div className='bg-blue-500 flex items-center justify-center text-white col-span-1 row-span-1 w-full h-full'>8</div>
        <div className='bg-blue-500 flex items-center justify-center text-white col-span-1 row-span-1 w-full h-full'>9</div>
      </div>
      </DashboardContent>
      <DashboardContent>
      <Typography.Title className='text-center'>Tablet</Typography.Title>
      <div className='grid grid-cols-3 grid-rows-8 gap-2 w-full border-2 border-black mx-auto  justify-items-center h-96'>
        <div className='bg-blue-500 flex items-center justify-center text-white col-span-3 w-full h-full'>1</div>
        <div className='bg-blue-500 flex items-center justify-center text-white col-span-1 row-span-8 w-full h-full'>2</div>
        <div className='bg-blue-500 flex items-center justify-center text-white col-span-2 row-span-1 w-full h-full'>3</div>
        <div className='bg-blue-500 flex items-center justify-center text-white col-span-2 row-span-2 w-full h-full'>4</div>
        <div className='bg-blue-500 flex items-center justify-center text-white col-span-2 row-span-2 w-full h-full'>5</div>
        <div className='bg-blue-500 flex items-center justify-center text-white col-span-1 row-span-1 w-full h-full'>6</div>
        <div className='bg-blue-500 flex items-center justify-center text-white col-span-1 row-span-1 w-full h-full'>7</div>
        <div className='bg-blue-500 flex items-center justify-center text-white col-span-1 row-span-1 w-full h-full'>8</div>
        <div className='bg-blue-500 flex items-center justify-center text-white col-span-1 row-span-1 w-full h-full'>9</div>
      </div>
      </DashboardContent>
      <DashboardContent>
      <Typography.Title className='text-center'>Mobile</Typography.Title>
      <div className='grid grid-cols-1  gap-2 w-full border-2 border-black mx-auto  justify-items-center h-96'>
        <div className='bg-blue-500 flex items-center justify-center text-white  w-full h-full'>1</div>
        <div className='bg-blue-500 flex items-center justify-center text-white  w-full h-full'>2</div>
        <div className='bg-blue-500 flex items-center justify-center text-white w-full h-full'>3</div>
        <div className='bg-blue-500 flex items-center justify-center text-white w-full h-full'>4</div>
        <div className='bg-blue-500 flex items-center justify-center text-white  w-full h-full'>5</div>
        <div className='bg-blue-500 flex items-center justify-center text-white  w-full h-full'>6</div>
        <div className='bg-blue-500 flex items-center justify-center text-white  w-full h-full'>7</div>
        <div className='bg-blue-500 flex items-center justify-center text-white w-full h-full'>8</div>
        <div className='bg-blue-500 flex items-center justify-center text-white  w-full h-full'>9</div>
      </div>
      </DashboardContent>
    </Layout>

    </main>
  )
}

export default DashboardScreen