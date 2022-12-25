// import from libraries
import 'styled-components/macro'
import { useCallback } from 'react'
import { Slider } from '@mui/material'

// import from this project
import { usePronounciation } from 'hooks'
import { Text } from 'components/parts/Texts'

export const RangeSlider: React.FC = () => {
  const { changeRate, rate } = usePronounciation()

  const handleChange = useCallback(
    (_: Event, value: number | number[]) => {
      changeRate(typeof value === 'number' ? value : value[0])
    },
    [changeRate]
  )

  return (
    <div>
      <Text>Speed</Text>
      <Slider
        valueLabelDisplay='auto'
        value={rate}
        onChange={handleChange}
        min={0.5}
        max={1.5}
        step={0.1}
      />
    </div>
  )
}
