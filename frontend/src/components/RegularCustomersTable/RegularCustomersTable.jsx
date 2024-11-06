import { Paper, Typography } from '@mui/material'
import VirtualizedTable from '../VirtualizedTable'
import { rows } from './rowsMock'

const columns = [
  {
    width: 30,
    key: 'id',
    label: '#',
    align: 'center',
    render: (row) => {
      return <Typography>{row.id}</Typography>
    },
  },
  {
    width: 200,
    key: 'name',
    label: 'Имя постоянника',
    sortingField: 'name',
    render: (row) => {
      return <Typography>{row.name}</Typography>
    },
  },
  {
    width: 100,
    key: 'code_phrase',
    label: 'Кодовая фраза',
    sortingField: 'code_phrase',
    render: (row) => {
      return <Typography>{row.code_phrase}</Typography>
    },
  },
  {
    width: 150,
    key: 'phone',
    label: 'Телефон',
    render: (row) => {
      return <Typography>{row.phone}</Typography>
    },
  },
  {
    width: 80,
    key: 'score',
    label: 'Баллы',
    sortingField: 'score',
    render: (row) => {
      return <Typography>{row.score}</Typography>
    },
  },
]

export const RegularCustomersTable = () => {
  return (
    <Paper
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
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
      <VirtualizedTable data={rows} columns={columns} />
    </Paper>
  )
}
