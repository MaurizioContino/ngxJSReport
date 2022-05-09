import { Component, OnInit } from '@angular/core';
import { FilterModel } from 'src/app/models/FilterModel';
import { WorkspaceService } from 'src/app/services/Workspace.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  constructor(public ws: WorkspaceService) { }

  ngOnInit(): void {

  }
  GetParameters(): FilterModel[] {

    return this.ws.Filters.filter(v => v.Value.startsWith("@"))

  }
}
