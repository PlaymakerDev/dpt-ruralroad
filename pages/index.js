import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const IndexPage = () => {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/login');
  }, [])
  
  return null;
}

export default React.memo(IndexPage)