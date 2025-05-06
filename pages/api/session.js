import { getLoginSession } from '@/utils/auth'

export default async function logout(
  req,
  res,
) {
  const [session, redirectPath] = await getLoginSession(req)
  if (!session) {
    return res.status(401).end()
  }
  return res.json(session)
}
