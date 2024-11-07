import { KeyboardArrowDown, KeyboardArrowUp, SwapVert } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { useCallback, useMemo } from 'react'
import { SortOrder } from '../VirtualizedTable.types'

interface SortingSwitchProps {
  onToggleSorting: (order: SortOrder) => void
  value: SortOrder
}

const orderStates: SortOrder[] = ['asc', 'desc', null]

const SortingSwitch: React.FC<SortingSwitchProps> = ({ onToggleSorting, value }) => {
  const handleClickSorting = useCallback(() => {
    let nextIndex = orderStates.findIndex((v) => v === value) + 1
    if (nextIndex === orderStates.length) {
      nextIndex = 0
    }
    const nextState = orderStates[nextIndex]
    onToggleSorting(nextState)
  }, [onToggleSorting, value])

  const sortingIcon = useMemo(() => {
    switch (value) {
      case 'asc':
        return <KeyboardArrowDown />
      case 'desc':
        return <KeyboardArrowUp />
      default:
        return <SwapVert />
    }
  }, [value])

  return (
    <IconButton onClick={handleClickSorting}>
      <Box display="flex" flexDirection="column">
        {sortingIcon}
      </Box>
    </IconButton>
  )
}

export default SortingSwitch
