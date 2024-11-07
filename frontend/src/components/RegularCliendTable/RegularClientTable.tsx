import { CircularProgress, IconButton, Paper, Typography } from "@mui/material";
import { ColumnDef, VirtualizedTable } from "../VirtualizedTable";
import {
  RegularClient,
  RegularClientConfig,
} from "../../api/RegularClientsCRUD";
import { useContext, useEffect } from "react";
import { ApiContext } from "../../App.utils";
import { useRegularClient } from "./UseRegularClient";
import { isNull } from "lodash";
import { Delete } from "@mui/icons-material";
import { EditableField } from "./EditableField";

type ColumnsContext = {
  onDelete: (id: number) => void;
  onUpdate: (row: RegularClient, newData: RegularClientConfig) => void;
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
    render: (row) => {
      const onUpdateField = (newValue: string) =>
        context.onUpdate(row, { name: newValue });
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
    render: (row) => {
      const onUpdateField = (newValue: string) =>
        context.onUpdate(row, { code_phrase: newValue });
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
    render: (row) => {
      const onUpdateField = (newValue: string) =>
        context.onUpdate(row, { phone: newValue });
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
    render: (row) => {
      const onUpdateField = (newValue: number) =>
        context.onUpdate(row, { score: newValue });
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
  const { clientRows, isLoading, getClients, deleteClient, updateClient } =
    useRegularClient(api);

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
      {/* <Box display="flex" flexWrap="wrap" gap="10px" mt="5px">
        <MultipleSelect
          label="Компании"
          options={companyOptions}
          value={companyFilter}
          onChange={handleChangeCompanyFilter}
        />
      </Box> */}
      <VirtualizedTable
        data={clientRows}
        columns={columns({ onDelete: deleteClient, onUpdate: updateClient })}
      />
    </Paper>
  );
}
