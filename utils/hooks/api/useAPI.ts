import API from '../../api'
import { start as taskStart, finished as taskFinished } from '@/store/features/tasksRunningSlice'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

const useAPI = (loadType: 'overlay' | 'none') => {
  const dispatch = useAppDispatch()
  const { locale } = useRouter()
  const userAuth = useAppSelector(state => state.user)
  const start = (name: string) => dispatch(taskStart({ name, loadType }))
  const end = (name: string) => setTimeout(() => { dispatch(taskFinished({ name })) }, 200)
  const onExpire = () => {
    // location.replace('/api/logout')
    location.replace(`/session-expired`)
  }
  const api = API(userAuth, locale || 'th', start, end, onExpire)
  return api
}

export default useAPI
