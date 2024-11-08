import {
  RegularClient,
  RegularClientConfig,
  RegularClientCRUD,
} from "./RegularClientsCRUD";

export class ApiYii2Backend implements RegularClientCRUD {
  apiUrl: string = import.meta.env.VITE_API_URL;

  constructor() {}

  async createRegularClient(data: RegularClientConfig) {
    const response = await fetch(`${this.apiUrl}?r=regular/create`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Статус запроса: ${response.status}`);
    }

    const result = (await response.json()) as {
      id: number;
    } & RegularClientConfig;

    return {
      name: null,
      code_phrase: null,
      phone: null,
      score: null,
      ...result,
    };
  }

  async getRegularClients() {
    const response = await fetch(`${this.apiUrl}?r=regular/index`, {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Статус запроса: ${response.status}`);
    }

    const result = (await response.json()) as RegularClient[];

    return result;
  }

  async updateRegularClient(id: number, newData: RegularClientConfig) {
    const response = await fetch(`${this.apiUrl}?r=regular/update&id=${id}`, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      return null;
    }

    const result = (await response.json()) as RegularClient;

    return result;
  }

  async deleteRegular(id: number) {
    const response = await fetch(`${this.apiUrl}?r=regular/delete&id=${id}`, {
      method: "DELETE",
      mode: "cors",
    });

    if (!response.ok) {
      return false;
    }

    return true;
  }
}
