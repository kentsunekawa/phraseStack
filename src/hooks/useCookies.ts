import { useCookies as useReactCookies } from 'react-cookie'

export const useCookies = () => {
  const [cookies, setCookie, removeCookie] = useReactCookies<
    'accountId' | 'voice' | 'pageNum',
    {
      accountId: string
      voice: string
      pageNum: number
    }
  >(['accountId', 'voice', 'pageNum'])

  return { cookies, setCookie, removeCookie }
}
