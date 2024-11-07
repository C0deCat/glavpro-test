import { Paper, Typography } from "@mui/material";
import { ColumnDef, VirtualizedTable } from "../VirtualizedTable";
import { rowsMock } from "./rowsMock";

interface RegularClient {
  id: number;
  name: string | null;
  code_phrase: string | null;
  phone: string | null;
  score: number | null;
}
const columns: ColumnDef<RegularClient>[] = [
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
      return <Typography>{row.name}</Typography>;
    },
  },
  {
    width: 30,
    key: "code_phrase",
    label: "Кодовая фраза",
    sortingField: "code_phrase",
    align: "center",
    render: (row) => {
      return <Typography>{row.code_phrase}</Typography>;
    },
  },
  {
    width: 30,
    key: "phone",
    label: "Номер телефона",
    align: "center",
    render: (row) => {
      return <Typography>{row.phone}</Typography>;
    },
  },
  {
    width: 30,
    key: "score",
    label: "Бонусные баллы",
    sortingField: "score",
    align: "center",
    render: (row) => {
      return <Typography>{row.score}</Typography>;
    },
  },
];

export function RegularClientTable() {
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
      <VirtualizedTable data={rowsMock} columns={columns} />
    </Paper>
  );
}
