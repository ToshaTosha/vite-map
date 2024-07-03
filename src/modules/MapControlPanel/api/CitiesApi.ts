import { BaseApi } from '@/api/BaseApi'

export interface City {
  id: number,
  city: string,
  file_name: string,
  latitude: number,
  longitude: number,
  zoom: number,
  group_id: number,
}

export interface UserCollection extends City {
}


export class CitiesApi extends BaseApi<City, UserCollection> {
  protected readonly endpoint: string = '/cities';
  protected readonly hasFinishSlash = false;
  
  constructor() {
    super()
  }

  public getCities() {
    return this.getAll({})
  }
}
