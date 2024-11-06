import React from 'react'
import { Box } from '@mui/material'
import RegularCustomersTable from './components/RegularCustomersTable'

function App() {
  return (
    <>
    <Box display="flex" height="calc(100vh - 70px)">
      <Box
        flexBasis="400px"
        flexGrow={1}
        height="100%"
      >
        <RegularCustomersTable />
      </Box>
    </Box>
    </>
  )
}

export default App
