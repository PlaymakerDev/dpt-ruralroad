import AllWeight from "../components/AllWeight";
import DashboardDetail from "../components/DashboardDetail";
import RandomTruck from "../components/RandomTruck";
import ThreeGraph from "../components/ThreeGraph";
import TopFive from "../components/TopFive";
import Webcam from "../components/Webcam";

const DesktopLayout = () => {
  return (
    <>
      <div className='hidden lg:grid grid-cols-5 grid-rows-4 gap-4 w-full  mx-auto justify-items-center '>
        <div className=' flex items-center justify-center text-white col-span-3 w-full h-full'> <DashboardDetail /> </div>
        <div className=' text-white col-span-2 row-span-2 w-full h-full'> <ThreeGraph/> </div>
        <div className=' text-white col-span-1 row-span-3 w-full h-full'> <RandomTruck /> </div>
        <div className=' text-white col-span-2 row-span-1 w-full h-full'> <TopFive/> </div>
        <div className=' text-white col-span-2 row-span-2 w-full h-full'> <AllWeight/> </div>
        <div className=' text-white col-span-1 row-span-1 w-full h-full'> <Webcam/> </div>
        <div className=' text-white col-span-1 row-span-1 w-full h-full'> <Webcam/> </div>
        <div className=' text-white col-span-1 row-span-1 w-full h-full'> <Webcam/> </div>
        <div className=' text-white col-span-1 row-span-1 w-full h-full'> <Webcam/> </div>
      </div>
    </>
  );
};

export default DesktopLayout;
