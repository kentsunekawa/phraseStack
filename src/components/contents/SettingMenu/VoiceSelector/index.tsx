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
import { useStyle, usePronounciation } from 'hooks'
import { createStyles } from './styles'

export const VoiceSelector: React.FC = () => {
  const { styles } = useStyle(createStyles)

  const { voice, availableVoices, selectVoice } = usePronounciation()

  const handleSelect = useCallback(
    (e: SelectChangeEvent) =>
      selectVoice(
        availableVoices.find(({ name }) => name === e.target.value) ?? null
      ),
    [availableVoices, selectVoice]
  )

  return availableVoices.length > 0 ? (
    <FormControl size='small' variant='standard' css={styles.container}>
      <InputLabel>Voice</InputLabel>
      <Select
        css={styles.select}
        value={voice?.name ?? ''}
        onChange={handleSelect}
      >
        {availableVoices.map(({ name }) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : null
}
