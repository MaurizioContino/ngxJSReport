import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FieldModel } from 'src/app/models/FieldModel';
import { TableModel } from 'src/app/models/TableModel';
import { WorkspaceService } from 'src/app/services/Workspace.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']

})
export class AreaComponent implements OnInit {


  tabindex  = 0;
  private _viewindex = 0;
  public get viewindex() {
    return this._viewindex;
  }
  public set viewindex(value) {
    this._viewindex = value;
    this.ws.workspaceChanged();
  }
  GroupTypes = ['', 'Group', 'Sum', 'Count'];

  AvailableTables: TableModel[] = []

  constructor(public ws: WorkspaceService, private cdr: ChangeDetectorRef) {

  }


  getTables(): TableModel[] {
    var ret:TableModel[] = []
    Object.keys(this.ws.Tables).forEach(key => {
      ret.push(this.ws.Tables[key]);
    });
    return ret;
  }

  ngOnInit(): void {
    this.ws.AvailableTables.subscribe(data => {
      this.AvailableTables = data;
    });
    this.ws.onWorkspaceChange.subscribe((ws: WorkspaceService) => {
      this.cdr.detectChanges();
    });
    this.ws.getAvailableTable();
  }
  tablechanged(t: TableModel) {
    this.ws.workspaceChanged();
  }

  AddTable(t: TableModel) {

    this.ws.addtable(t)
  }
  TableChanged(e: any) {
    var field = e.field as FieldModel;
    if (field.Selected) {
      if (this.ws.SelectedFields.indexOf(field)==-1) {
        this.ws.SelectedFields.push(field);
      }
    } else {
      var idx = this.ws.SelectedFields.indexOf(field);
      if (idx > -1) {
        this.ws.SelectedFields.splice(idx,1);
      }
    }
    this.tabindex = 1;

    this.groupCheck();

    this.ws.workspaceChanged();
  }
  groupCheck(){
    if (this.ws.anyGroup()) {
      this.ws.SelectedFields.forEach(f => {
        if (f.GroupType == "") {
          f.GroupType = "Group";
        }
      })
    }
  }

}
