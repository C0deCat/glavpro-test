import { filter, findIndex, isUndefined } from "lodash";
import {
  RegularClient,
  RegularClientCRUD,
  RegularClientConfig,
} from "./RegularClientsCRUD";
import { rowsMock } from "./rowsMock";

export class ApiMock implements RegularClientCRUD {
  clients: RegularClient[];
  index: number;
  constructor() {
    this.clients = rowsMock;
    this.index = rowsMock.length;
  }

  async createRegularClient(data: RegularClientConfig) {
    this.index++;
    const newClient: RegularClient = {
      id: this.index,
      name: isUndefined(data.name) ? null : data.name,
      code_phrase: isUndefined(data.code_phrase) ? null : data.code_phrase,
      phone: isUndefined(data.phone) ? null : data.phone,
      score: isUndefined(data.score) ? null : data.score,
    };
    this.clients.push(newClient);

    return newClient;
  }

  async getRegularClients() {
    return this.clients;
  }

  async updateRegularClient(id: number, newData: RegularClientConfig) {
    const { name, code_phrase, phone, score } = newData;
    const oldClientIndex = findIndex(
      this.clients,
      (client: RegularClient) => client.id === id
    );

    if (oldClientIndex === -1) {
      return null;
    }

    const updatedClient: RegularClient = {
      ...this.clients[oldClientIndex],
      ...(isUndefined(name) ? null : { name }),
      ...(isUndefined(code_phrase) ? null : { code_phrase }),
      ...(isUndefined(phone) ? null : { phone }),
      ...(isUndefined(score) ? null : { score }),
    };

    this.clients[oldClientIndex] = updatedClient;

    return updatedClient;
  }

  async deleteRegular(id: number) {
    const oldLength = this.clients.length;
    this.clients = filter(this.clients, (value) => value.id !== id);
    const newLength = this.clients.length;

    if (oldLength !== newLength) {
      return false;
    }

    return true;
  }
}
