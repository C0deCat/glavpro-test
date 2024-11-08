import {
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { ColumnDef, VirtualizedTable } from "../VirtualizedTable";
import {
  RegularClient,
  RegularClientConfig,
} from "../../api/RegularClientsCRUD";
import { useContext, useEffect, useRef } from "react";
import { ApiContext } from "../../App.utils";
import { useRegularClient } from "./UseRegularClient";
import { isNull } from "lodash";
import { Delete } from "@mui/icons-material";
import { EditableField } from "./EditableField";
import { TableVirtuosoHandle } from "react-virtuoso";

type ColumnsContext = {
  onDelete: (id: number) => void;
  onUpdate: (
    index: number,
    row: RegularClient,
    newData: RegularClientConfig
  ) => void;
};

const columns = (context: ColumnsContext): ColumnDef<RegularClient>[] => [
  {
    width: 30,
    key: "id",
    label: "#",
    align: "center",
    render: (row) => {
      return <Typography>{row.id}</Typography>;
    },
  },
  {
    width: 200,
    key: "name",
    label: "Имя постоянника",
    sortingField: "name",
    align: "center",
    render: (row, index) => {
      const onUpdateField = (newValue: string) => {
        context.onUpdate(index, row, { name: newValue });
      };
      return (
        <EditableField
          isNumber={false}
          defaultValue={row.name ?? ""}
          onUpdate={onUpdateField}
        />
      );
    },
  },
  {
    width: 150,
    key: "code_phrase",
    label: "Кодовая фраза",
    sortingField: "code_phrase",
    align: "center",
    render: (row, index) => {
      const onUpdateField = (newValue: string) => {
        context.onUpdate(index, row, { code_phrase: newValue });
      };
      return (
        <EditableField
          isNumber={false}
          defaultValue={row.code_phrase ?? ""}
          onUpdate={onUpdateField}
        />
      );
    },
  },
  {
    width: 150,
    key: "phone",
    label: "Номер телефона",
    align: "center",
    render: (row, index) => {
      const onUpdateField = (newValue: string) => {
        context.onUpdate(index, row, { phone: newValue });
      };
      return (
        <EditableField
          isNumber={false}
          defaultValue={row.phone ?? ""}
          onUpdate={onUpdateField}
        />
      );
    },
  },
  {
    width: 100,
    key: "score",
    label: "Бонусные \nбаллы",
    sortingField: "score",
    align: "center",
    render: (row, index) => {
      const onUpdateField = (newValue: number) =>
        context.onUpdate(index, row, { score: newValue });
      return (
        <EditableField
          isNumber={true}
          defaultValue={row.score ?? 0}
          onUpdate={onUpdateField}
        />
      );
    },
  },
  {
    width: 70,
    key: "remove",
    label: "Удаление",
    align: "center",
    render: (row) => {
      const handleClick = () => context.onDelete(row.id);
      return (
        <IconButton color="error" onClick={handleClick}>
          <Delete />
        </IconButton>
      );
    },
  },
];

export function RegularClientTable() {
  const api = useContext(ApiContext);
  const {
    clientRows,
    isLoading,
    getClients,
    deleteClient,
    updateClient,
    createClient,
  } = useRegularClient(api);

  const virtuosoRef = useRef<TableVirtuosoHandle>(null);

  const onUpdate = (
    index: number,
    row: RegularClient,
    newData: RegularClientConfig
  ) => {
    updateClient(row, newData);
    virtuosoRef?.current?.scrollToIndex({
      index,
      behavior: "auto",
      align: "start",
    });
  };

  const onCreate = () => {
    createClient({ name: "John D." });
    virtuosoRef?.current?.scrollToIndex({
      index: clientRows?.length ?? 0,
      behavior: "auto",
      align: "start",
    });
  };

  useEffect(() => {
    getClients();
  }, []);

  if (isNull(clientRows) || isLoading) {
    return (
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <CircularProgress sx={{ marginTop: "25px" }} />
      </Paper>
    );
  }

  return (
    <Paper
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <VirtualizedTable
        data={clientRows}
        columns={columns({
          onDelete: deleteClient,
          onUpdate,
        })}
        virtuosoRef={virtuosoRef}
      />
      <Button
        sx={{ marginTop: "5px", fontSize: "16px" }}
        color="primary"
        variant="contained"
        onClick={onCreate}
      >
        Добавить запись
      </Button>
    </Paper>
  );
}
