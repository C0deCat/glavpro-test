import { Box } from "@mui/material";
import "./App.css";
import RegularClientTable from "./components/RegularCliendTable";

function App() {
  return (
    <Box display="flex" height="calc(100vh - 70px)">
      <RegularClientTable />
    </Box>
  );
}

export default App;
