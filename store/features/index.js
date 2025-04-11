import user from './userSlice'
import tasksRunning from './tasksRunningSlice'
import example from './exampleSlice'
import vehicleWeight from './vehicleWeightSlice'
import dashboard from './dashboardSlice'
import master from './masterSlice'
import information from './informationSlice'
import cctv from './cctvSlice'
import setting from './settingSlice'
import report from './reportSlice'
// {{import}}

const rootReducer = {
  user,
  tasksRunning,
	example,
	vehicleWeight,
	dashboard,
	master,
	information,
	cctv,
	setting,
	report,
// {{export}}
}

export default rootReducer
