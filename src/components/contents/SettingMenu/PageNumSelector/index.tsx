// import from libraries
import 'styled-components/macro'
import { useCallback } from 'react'
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
} from '@mui/material'

// import from this project
import { useStyle, usePageNum } from 'hooks'
import { createStyles } from './styles'

const availablePages = ['5', '10', '15', '20', '30']

export const PageNumSelector: React.FC = () => {
  const { styles } = useStyle(createStyles)

  const { pageNum, selectPageNum } = usePageNum()

  const handleSelect = useCallback(
    (e: SelectChangeEvent) => selectPageNum(Number(e.target.value)),
    [selectPageNum]
  )

  return (
    <FormControl size='small' variant='standard' css={styles.container}>
      <InputLabel>Number of Pages</InputLabel>
      <Select css={styles.select} value={`${pageNum}`} onChange={handleSelect}>
        {availablePages.map((num) => (
          <MenuItem key={num} value={num}>
            {num}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
