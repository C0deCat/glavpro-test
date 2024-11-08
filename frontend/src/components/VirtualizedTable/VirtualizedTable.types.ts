import { TableVirtuosoHandle } from "react-virtuoso";

export interface ColumnDef<T> {
  label: string;
  key: string;
  width?: number;
  sortingField?: string;
  align?: "right" | "left" | "center" | "inherit" | "justify";
  render?: (row: T, index: number) => React.ReactNode;
}

export interface VirtualizedTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  virtuosoRef?: React.RefObject<TableVirtuosoHandle>;
}
export type SortOrder = "asc" | "desc" | null;
export type Sorting = {
  field: string | null;
  order: SortOrder;
};
