import { useCookies as useReactCookies } from 'react-cookie'

export const useCookies = () => {
  const [cookies, setCookie, removeCookie] = useReactCookies<
    'accountId' | 'voice',
    {
      accountId: string
      voice: string
    }
  >(['accountId', 'voice'])

  return { cookies, setCookie, removeCookie }
}
