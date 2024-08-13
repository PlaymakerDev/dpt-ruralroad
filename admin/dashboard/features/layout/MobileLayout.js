import AllWeight from "../components/AllWeight";
import DashboardDetail from "../components/DashboardDetail";
import RandomTruck from "../components/RandomTruck";
import ThreeGraph from "../components/ThreeGraph";
import TopFive from "../components/TopFive";
import Webcam from "../components/Webcam";

const MobileLayout = () => {
  return (
    <>
    <div className='md:hidden grid grid-cols-1 gap-4 w-full mx-auto justify-items-center'>
      {/* Content */}
      <div className=' flex items-center justify-center text-white w-full h-full'><DashboardDetail/></div>
      <div className=' text-white w-full h-full'><RandomTruck/></div>
      <div className=' text-white w-full h-full'><TopFive/></div>
      <div className=' text-white w-full h-full'><AllWeight/></div>
      <div className=' text-white w-full h-full'><ThreeGraph/></div>
      <div className=' text-white w-full h-full'><Webcam/></div>
      <div className=' text-white w-full h-full'><Webcam/></div>
      <div className=' text-white w-full h-full'><Webcam/></div>
      <div className=' text-white w-full h-full'><Webcam/></div>
    </div>
    </>
  );
};

export default MobileLayout;
