import { BaseApi } from '@/api/BaseApi'

export interface Device {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
}

export interface UserCollection extends Device {
}


export class DevicesApi extends BaseApi<Device, UserCollection> {
  protected readonly endpoint: string = '/devices';
  protected readonly hasFinishSlash = false;
  
  constructor() {
    super()
  }

  public getDevices() {
    return this.getAll({})
  }
}
