import { createContext } from "react";
import { RegularClientCRUD } from "./api/RegularClientsCRUD";
import { ApiMock } from "./api/ApiMock";

export const ApiContext = createContext<RegularClientCRUD>(new ApiMock());
