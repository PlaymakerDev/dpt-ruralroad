import React, { useMemo, createContext, useState } from 'react'
import OverlayProvider from './OverlayProvider'
import { User } from '@/utils/auth/user'
import { useAppSelector } from '@/store/hooks'
import { getTasksRunning } from '@/store/features/tasksRunningSlice'
import useRefreshToken from '@/utils/hooks/useRefreshToken'

export const AppContext = createContext({ user: null, setStateUser: () => {} })

const AppProvider = (props) => {
  const { children, user } = props
  const [stateUser, setStateUser] = useState(user)
  const tasksRunning = useAppSelector((state) => state.tasksRunning)

  const loading = useMemo(() => {
    return getTasksRunning(tasksRunning)?.loadingOverlay !== false
  }, [tasksRunning])

  return (
    <AppContext.Provider value={{ user: stateUser || null, setStateUser }}>
      <OverlayProvider loading={loading}>
        {children}
      </OverlayProvider>
    </AppContext.Provider>
  )
}

export default AppProvider
