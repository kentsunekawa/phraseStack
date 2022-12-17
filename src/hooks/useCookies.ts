import { useCookies as useReactCookies } from 'react-cookie'

export const useCookies = () => {
  const [cookies, setCookie, removeCookie] = useReactCookies<
    'accountId',
    {
      accountId: string
    }
  >(['accountId'])

  return { cookies, setCookie, removeCookie }
}
