import { Box } from "@mui/material";
import "./App.css";
import RegularClientTable from "./components/RegularCliendTable";
import { RegularClientCRUD } from "./api/RegularClientsCRUD";
import { ApiContext } from "./App.utils";
import { ApiMock } from "./api/ApiMock";

function App() {
  //todo: Smolkin V. заменить на ApiYiiBackend();
  const clientsCrud: RegularClientCRUD = new ApiMock();

  return (
    <ApiContext.Provider value={clientsCrud}>
      <Box display="flex" height="calc(100vh - 20px)">
        <RegularClientTable />
      </Box>
    </ApiContext.Provider>
  );
}

export default App;
