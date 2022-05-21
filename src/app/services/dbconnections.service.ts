import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthModel } from '../models/AuthModel';
import { ServerConfigService } from './server-config.service';

@Injectable({
  providedIn: 'root'
})
export class DBConnectionsService {

  constructor(private http: HttpClient, private backend: ServerConfigService) { }

  public GetAllConnections(): Subject<any[]>{
    var ret = new Subject<any[]>();
    this.http.get<any[]>(this.backend.ServerAddress + '/ConnectionStrings').subscribe((data: any[]) => {
      ret.next(data);
    });
    return ret;
  }
  public SaveConnection(item: AuthModel): Subject<any[]>{
    var ret = new Subject<any[]>();
    var req: any = null;
    if (item.Id == null) {
      req = {
        Name: item.Server,
        Description: item.Server,
        ConnectionString:  `Server=${item.Server};Initial Catalog=${item.Database};persist security info=False;User id=${item.UserName}; Password=${item.Password};`,
      }
    } else {
      req = {
        Name: item.Server,
        Description: item.Server,
        ConnectionString:  item.ConnectionString,
      }
    }
    this.http.post<any[]>(this.backend.ServerAddress + '/ConnectionStrings', req).subscribe((data: any[]) => {
      ret.next(data);
    });
    return ret;
  }

}
