import { useCallback, useMemo, useState } from 'react'
import { Sorting, SortOrder } from './VirtualizedTable.types'
import { get, orderBy } from 'lodash'

export const useSorting = <T>(data: T[]) => {
  const [sorting, setSorting] = useState<Sorting>({
    field: null,
    order: null,
  })

  const sortedData = useMemo(() => {
    if (sorting.field && sorting.order) {
      return orderBy(data, [(row) => get(row, sorting.field ?? '')], [sorting.order])
    }
    return data
  }, [data, sorting])

  const handleToggleSorting = useCallback(
    (field: string) => (order: SortOrder) => {
      setSorting({ field, order })
    },
    [setSorting]
  )

  const getSortingToggleValue = useCallback(
    (sortingField: string) => {
      return sortingField === sorting.field ? sorting.order : null
    },
    [sorting.field, sorting.order]
  )

  return {
    sortedData,
    handleToggleSorting,
    getSortingToggleValue,
  }
}
