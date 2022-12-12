// import from this project
import { useGetPagesQuery } from 'operations/queries/__generated__/GetPages'

export const Home: React.FC = () => {
  const { data } = useGetPagesQuery()

  console.log(data)

  return <>Home</>
}
