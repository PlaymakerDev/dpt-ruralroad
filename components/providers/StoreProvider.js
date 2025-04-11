import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
// import { makeStore, AppStore } from '@/store'
import { wrapper } from '@/store'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { signIn } from '@/store/features/userSlice'
import { User } from '@/utils/auth/user';

function StoreProvider({ user, children }) {
  const dispatch = useAppDispatch()
  const userRef = useRef()

  useEffect(() => {
    if (!userRef.current) {
      dispatch(signIn(user))
      userRef.current = user
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { children }
}

export default StoreProvider
