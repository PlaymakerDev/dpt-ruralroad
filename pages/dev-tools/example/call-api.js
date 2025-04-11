import React, { useEffect } from 'react';
// import { Row, Col } from 'antd';
// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import { User } from '@/utils/auth/user';
// import styles from '@/features/login/styles/Sample.module.css'
// import { Field } from '@/components/form'
// import useGetAPI from '@/utils/hooks/api/useGetAPI'
// import usePostAPI from '@/utils/hooks/api/usePostAPI'
// import usePutAPI from '@/utils/hooks/api/usePutAPI'
// import usePatchAPI from '@/utils/hooks/api/usePatchA/PI'
// import useDeleteAPI from '@/utils/hooks/api/useDeleteAPI'
// import { fetchIndex } from '@/store/features/exampleSlice'
// import { wrapper, AppState } from '@/store'
// import { signIn } from '@/store/features/userSlice'
// import { getLoginSession } from '@/utils/auth'
// import { validatePermissionRoute, redirectToLogin, sessionToProps } from '@/utils/auth/routePermission'
// import { PageProps, Redirect } from '@/utils/types/pages'

const Login = (props) => {
  const { /*error, username, user*/ } = props
  // const [funcGet, loadingGet, data] = useGetAPI('overlay', 
  // {
  //   funcDispatch: fetchIndex, reducerName: 'example', reducerKey: 'data'
  // }
  // )
  // const [funcPost, loadingPost, dataPost] = usePostAPI()
  // const [funcPut, loadingPut, dataPut] = usePutAPI()
  // const [funcPatch, loadingPatch, dataPatch] = usePatchAPI()
  // const [funcDelete, loadingDelete, dataDelete] = useDeleteAPI()

  // useEffect(() => {
  // funcGet('/company_business', { page: 1, page_size: 10 })
  // funcPost('company_business1', { id: 1, name: '1' })
  // funcPut('company_business1', { id: 1, name: '1' })
  // funcPatch('company_business1', { id: 1, name: '1' })
  // funcDelete('company_business1', { id: 1, name: '1' })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  
  

  return (
    <>
    <h2>Sample</h2>
      {/* <main className={styles.container}>
        Example call api
        {loadingGet === false && (
          <pre>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
        {loadingGet !== false && (
          <div>Loading...</div>
        )}
      </main> */}
    </>
  )
};

// export const getServerSideProps = wrapper.getServerSideProps(store => (async (context) => {
//   const session = await getLoginSession(context.req)

//   const valid = validatePermissionRoute(session, ['ADMIN', 'USER'])
//   if (!valid) {
//     return redirectToLogin()
//   }

//   store.dispatch(signIn(session));

//   return sessionToProps(session, session?.message)
// }));

export default Login
