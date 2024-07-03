import { BaseApi } from '@/api/BaseApi'

export interface Client {
  id: number,
  uid: number,
  latitude: number,
  longitude: number,
  update_date: string,
  status: string,
  group_id: number
}

export interface UpdateClientData {
  id: number,
  latitude: number,
  longitude: number,
}

export interface ClientCollection extends Client {
}


export class ClientsApi extends BaseApi<Client, ClientCollection> {
  protected readonly endpoint: string = '/clients_by_city';
  protected readonly hasFinishSlash = false;
  
  constructor() {
    super()
  }

  public getClientsByCity(id: number) {
    const data = { group_id: id }
    return this.getListById(data)
  }

  public updateClients(data: UpdateClientData) {
    return this.update(data)
  }
}
