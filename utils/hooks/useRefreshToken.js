import { useEffect } from 'react'
import { useAppDispatch } from '@/store/hooks'
import * as session from '../auth/session'
import { signIn } from '@/store/features/userSlice'

let interval

async function getSession() {
  return await session.getSession()
}

export function compereDate(createdAt) {
  if (!createdAt) return false
  const a = new Date().getTime() - createdAt
  
  return a > 7 * 24 * 60 * 60 * 1000
}

async function refreshToken(createdAt) {
  if (compereDate(createdAt)) {
    const newUser = await session.refresh()
    return newUser
  }

  return null
}

const useRefreshToken = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    getSession().then(async (data) => {
      const newUser = await refreshToken(data?.createdAt)
      if (newUser) {
        dispatch(signIn(newUser))
      }
    })
    if (interval) clearInterval(interval)

    interval = setInterval(() => {
      getSession().then(async (data) => {
        const newUser = await refreshToken(data?.createdAt)
        if (newUser) {
          dispatch(signIn(newUser))
        }
      })
    }, 1000 * 60 * 4)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useRefreshToken
