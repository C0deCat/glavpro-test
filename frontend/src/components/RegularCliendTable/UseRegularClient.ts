import { useCallback, useMemo, useState } from "react";
import {
  RegularClient,
  RegularClientCRUD,
  RegularClientConfig,
} from "../../api/RegularClientsCRUD";
import { filter, findIndex, isNull, isUndefined } from "lodash";

// note: при масштабировании хук становится основой для редюсера/модели стора.
export const useRegularClient = (api: RegularClientCRUD) => {
  const [clientRows, setClientRows] = useState<RegularClient[] | null>(null);
  const isLoading = useMemo(() => clientRows === null, [clientRows]);

  const getClients = useCallback(async () => {
    try {
      const clients = await api.getRegularClients();
      setClientRows(clients);
    } catch (error: unknown) {
      setClientRows(null);
      // todo: Если будет время - заменить console error на сообщения для SnackBar
      console.error(error);
    }
  }, [api, setClientRows]);

  const deleteClient = useCallback(
    (id: number) => {
      const newClientsRows = filter(clientRows, (value) => value.id !== id);
      setClientRows(newClientsRows);

      api
        .deleteRegular(id)
        .then((removed) => {
          if (!removed) {
            getClients();
          }
        })
        .catch((reason) => {
          console.error(reason);
          getClients();
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

      api
        .updateRegularClient(data.id, newData)
        .then((client) => {
          if (isNull(client)) {
            getClients();
          }
        })
        .catch((reason) => {
          console.error(reason);
          getClients();
        });
    },
    [clientRows, setClientRows, api, getClients]
  );

  const createClient = useCallback(
    async (data: RegularClientConfig) => {
      try {
        const newClient = await api.createRegularClient(data);
        const newClientRows = [...(clientRows ?? [])];
        newClientRows.push(newClient);
        setClientRows(newClientRows);
      } catch (error: unknown) {
        console.error(error);
        getClients();
      }
    },
    [api, clientRows, setClientRows, getClients]
  );

  return {
    clientRows,
    isLoading,
    getClients,
    deleteClient,
    updateClient,
    createClient,
  };
};
