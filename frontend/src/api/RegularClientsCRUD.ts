export interface RegularClient {
  id: number;
  name: string | null;
  code_phrase: string | null;
  phone: string | null;
  score: number | null;
}

export type RegularClientConfig = Partial<Omit<RegularClient, "id">>;

export interface RegularClientCRUD {
  createRegularClient: (data: RegularClientConfig) => Promise<RegularClient>;
  getRegularClients: () => Promise<RegularClient[]>;
  updateRegularClient: (
    id: number,
    newData: RegularClientConfig
  ) => Promise<RegularClient | null>;
  deleteRegular: (id: number) => Promise<boolean>;
}
