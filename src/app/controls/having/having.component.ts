import { Component, OnInit } from '@angular/core';
import { FieldModel } from 'src/app/models/FieldModel';
import { TableModel } from 'src/app/models/TableModel';
import { WorkspaceService } from 'src/app/services/Workspace.service';

@Component({
  selector: 'app-having',
  templateUrl: './having.component.html',
  styleUrls: ['./having.component.scss']
})
export class HavingComponent implements OnInit {

  FilterTypes: string[] = ['=', '!=', '>', '<', '>=', '<=', 'is null', 'is not null', 'between', 'not between'];
  constructor(public ws: WorkspaceService) { }

  ngOnInit(): void {
  }
  GetFields(): FieldModel[] {
    var ret: FieldModel[] = []

    Object.keys(this.ws.Tables).forEach(t => {
      (this.ws.Tables[t] as TableModel).Fields.filter(v=>v.GroupType!="" && v.GroupType!="Group").forEach((f: FieldModel) => {
        ret.push(f)
      });
    });
    return ret;
  }


}
