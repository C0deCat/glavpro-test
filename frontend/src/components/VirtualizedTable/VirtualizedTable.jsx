import React, { forwardRef, useCallback } from 'react'
import * as ReactDOM from 'react-dom'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useSorting } from './VirtualizedTable.utils'
import SortingSwitch from './SortingSwitch'
import { TableVirtuoso } from 'react-virtuoso'

export const VirtualizedTable = (props) => {
  const { data, columns } = props
  const { sortedData, handleToggleSorting, getSortingToggleValue } = useSorting(data)

  const VirtuosoTableComponents = {
    Scroller: forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead: forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableHead {...props} ref={ref} />
    )),
    TableRow,
    TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  }

  const fixedHeaderContent = useCallback(() => {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.key}
            variant="head"
            align={column.align ?? 'left'}
            style={{ width: column.width }}
            sx={{ backgroundColor: 'background.paper', padding: '5px' }}
          >
            <Box
              display="flex"
              alignItems="center"
              gap="5px"
              justifyContent={column.align ?? 'start'}
            >
              <Typography fontWeight="600">{column.label}</Typography>
              {column.sortingField ? (
                <SortingSwitch
                  onToggleSorting={handleToggleSorting(column.sortingField)}
                  value={getSortingToggleValue(column.sortingField)}
                />
              ) : null}
            </Box>
          </TableCell>
        ))}
      </TableRow>
    )
  }, [columns, handleToggleSorting, getSortingToggleValue])

  const rowContent = useCallback(
    (index, row) => {
      return columns.map((column) => (
        <TableCell
          key={`${column.key}_${index}`}
          align={column.align ?? 'left'}
          style={{ padding: '5px', borderBottom: 'none' }}
        >
          {column.render ? column.render(row) : null}
        </TableCell>
      ))
    },
    [columns]
  )

  return (
    <div>Что-то что-то
      <TableVirtuoso
      data={sortedData}
      components={VirtuosoTableComponents}
      fixedHeaderContent={fixedHeaderContent}
      itemContent={rowContent}
    />
    </div>
    
  )
}