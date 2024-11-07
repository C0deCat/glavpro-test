export interface ColumnDef<T> {
  label: string
  key: string
  width?: number
  sortingField?: string
  align?: 'right' | 'left' | 'center' | 'inherit' | 'justify'
  render?: (row: T) => React.ReactNode
}

export interface VirtualizedTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
}
export type SortOrder = 'asc' | 'desc' | null
export type Sorting = {
  field: string | null
  order: SortOrder
}
