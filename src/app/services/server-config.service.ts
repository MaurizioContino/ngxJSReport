import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerConfigService {


  private _ServerAddress = "https://localhost:7009";

  public get ServerAddress() {

    return this._ServerAddress;
  }
  public set ServerAddress(value) {

    this._ServerAddress = value;
  }

  constructor() { }
}
