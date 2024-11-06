import { useCallback, useMemo, useState } from "react";
import { get, orderBy } from "lodash";

export const useSorting = (data) => {
  const [sorting, setSorting] = useState({
    field: null,
    order: null,
  });

  const sortedData = useMemo(() => {
    if (sorting.field && sorting.order) {
      return orderBy(
        data,
        [(row) => get(row, sorting.field ?? "")],
        [sorting.order]
      );
    }
    return data;
  }, [data, sorting]);

  const handleToggleSorting = useCallback(
    (field) => (order) => {
      setSorting({ field, order });
    },
    [setSorting]
  );

  const getSortingToggleValue = useCallback(
    (sortingField) => {
      return sortingField === sorting.field ? sorting.order : null;
    },
    [sorting.field, sorting.order]
  );

  return {
    sortedData,
    handleToggleSorting,
    getSortingToggleValue,
  };
};
