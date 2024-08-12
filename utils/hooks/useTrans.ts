import { useRouter } from 'next/router'
import { trans } from '@/i18n/locales'

const useTrans = () => {
  const { locale } = useRouter();
  const tran = trans(locale);
  return tran
}

export default useTrans
