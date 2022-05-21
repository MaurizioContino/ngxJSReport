import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServerConfigService } from 'src/app/services/server-config.service';
import { WorkspaceService } from 'src/app/services/Workspace.service';

@Component({
  selector: 'app-server-config',
  templateUrl: './server-config.component.html',
  styleUrls: ['./server-config.component.scss']
})
export class ServerConfigComponent implements OnInit {

  @Output() onClose = new EventEmitter();

  addrs = "";
  constructor(public ws: WorkspaceService, private backend: ServerConfigService ) { }

  ngOnInit(): void {
    this.addrs = this.backend.ServerAddress;
  }

  save(){
    this.backend.ServerAddress = this.addrs;
    this.onClose.emit();
  }
  cancel(){
    this.addrs = this.backend.ServerAddress;
    this.onClose.emit();
  }
}
