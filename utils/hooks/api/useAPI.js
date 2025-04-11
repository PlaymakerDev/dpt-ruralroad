import API from '../../api'
import { start as taskStart, finished as taskFinished } from '@/store/features/tasksRunningSlice'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import config from '@/config'

const useAPI = (loadType) => {
  const dispatch = useAppDispatch()
  const { locale } = useRouter()
  const userAuth = useAppSelector(state => state.user)
  const start = (name) => dispatch(taskStart({ name, loadType }))
  const end = (name) => setTimeout(() => { dispatch(taskFinished({ name })) }, 200)
  const onExpire = () => {
    // location.replace('/api/logout')
    location.replace(`${config.basePath}/session-expired`)
  }
  const api = API(userAuth, locale || 'th', start, end, onExpire)
  return api
}

export default useAPI
