import { useCallback, useMemo, useState } from "react";
import {
  RegularClient,
  RegularClientCRUD,
  RegularClientConfig,
} from "../../api/RegularClientsCRUD";
import { filter, findIndex, isNull, isUndefined } from "lodash";

export const useRegularClient = (api: RegularClientCRUD) => {
  const [clientRows, setClientRows] = useState<RegularClient[] | null>(null);
  const isLoading = useMemo(() => clientRows === null, [clientRows]);

  const getClients = useCallback(async () => {
    const clients = await api.getRegularClients();
    setClientRows(clients);
  }, [api, setClientRows]);

  const deleteClient = useCallback(
    (id: number) => {
      const newClientsRows = filter(clientRows, (value) => value.id !== id);
      setClientRows(newClientsRows);
      api.deleteRegular(id).then((removed) => {
        if (!removed) {
          getClients();
        }
      });
    },
    [api, clientRows, setClientRows, getClients]
  );

  const updateClient = useCallback(
    (data: RegularClient, newData: RegularClientConfig) => {
      const { name, code_phrase, phone, score } = newData;
      const clientIndex = findIndex(
        clientRows,
        (client: RegularClient) => client.id === data.id
      );

      const updatedClient: RegularClient = {
        ...data,
        ...(isUndefined(name) ? {} : { name }),
        ...(isUndefined(code_phrase) ? {} : { code_phrase }),
        ...(isUndefined(phone) ? {} : { phone }),
        ...(isUndefined(score) ? {} : { score }),
      };

      const newClientRows = [...(clientRows ?? [])];
      newClientRows[clientIndex] = updatedClient;
      setClientRows(newClientRows);

      api.updateRegularClient(data.id, newData).then((client) => {
        if (isNull(client)) {
          getClients();
        }
      });
    },
    [clientRows, setClientRows, api, getClients]
  );

  const createClient = useCallback(async (data: RegularClientConfig) => {}, []);

  return {
    clientRows,
    isLoading,
    getClients,
    deleteClient,
    updateClient,
  };
};
