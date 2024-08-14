import DashboardFooter from "../components/DashboardFooter"
import DesktopLayout from "./DasktopLayout"
import MobileLayout from "./MobileLayout"
import TabletLayout from "./TabletLayout"

const DashboardLayout = () => {
  return (
    <>
    <DesktopLayout/>
    <TabletLayout/>
    <MobileLayout/> 
    <DashboardFooter/>
    </>

  )
}

export default DashboardLayout