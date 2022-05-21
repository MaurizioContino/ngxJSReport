import { Component, OnInit } from '@angular/core';
import { AuthModel } from 'src/app/models/AuthModel';
import { DBConnectionsService } from 'src/app/services/dbconnections.service';
import { ServerConfigService } from 'src/app/services/server-config.service';
import { WorkspaceService } from 'src/app/services/Workspace.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  ShowConfig = false;
  ShowConnection = false;
  Connections: any[] = [];
  constructor(public ws: WorkspaceService, private dbserv: DBConnectionsService,  public backend: ServerConfigService) { }

  ngOnInit(): void {
    this.dbserv.GetAllConnections().subscribe((data: any[]) => {
      this.Connections = data;
    });
  }
  NewDBConnection() {
    //var item = new AuthModel();
    this.ShowConnection = true;

  }
  SaveDBConnection(item: AuthModel) {
    this.dbserv.SaveConnection(item).subscribe((data: any[]) => {
      this.Connections = data;
      this.ShowConnection = false;
    });
  }
}
