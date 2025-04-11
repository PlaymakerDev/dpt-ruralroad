import { useEffect, useRef } from 'react'

const useEffectOne = (callback, depUpdate) => {
  const called = useRef(0)

  useEffect(() => {
    if (called.current == 0) {
      called.current += 1
      callback()
    } else if (called.current > 1 && depUpdate.length) {
      called.current += 1
      callback()
    } else if (called.current == 1 && depUpdate.length) {
      called.current += 1
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, depUpdate)
}

export default useEffectOne

