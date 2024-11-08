import { Box } from "@mui/material";
import "./App.css";
import RegularClientTable from "./components/RegularCliendTable";
import { RegularClientCRUD } from "./api/RegularClientsCRUD";
import { ApiContext } from "./App.utils";
import { ApiYii2Backend } from "./api/ApiYii2Backend";

function App() {
  const clientsCrud: RegularClientCRUD = new ApiYii2Backend();

  return (
    <ApiContext.Provider value={clientsCrud}>
      <Box display="flex" height="calc(100vh - 20px)">
        <RegularClientTable />
      </Box>
    </ApiContext.Provider>
  );
}

export default App;
