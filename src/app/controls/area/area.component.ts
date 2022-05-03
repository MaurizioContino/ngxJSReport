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
  constructor(public ws: WorkspaceService, private cdr: ChangeDetectorRef) { }


  getTables(): TableModel[] {
    var ret:TableModel[] = []
    Object.keys(this.ws.Tables).forEach(key => {
      ret.push(this.ws.Tables[key]);
    });
    return ret;
  }
  getAvailableTables(): TableModel[] {
    var x = Object.keys(this.ws.AvailableTables).map(key => {
      return this.ws.AvailableTables[key];
    });
    return x;
  }
  ngOnInit(): void {
    this.ws.onWorkspaceChange.subscribe((ws: WorkspaceService) => {
      this.cdr.detectChanges();
    });
  }
  tablechanged(t: TableModel) {
    this.ws.workspaceChanged();
  }

  AddTable(t: TableModel) {

    this.ws.addtable(t)
  }
  TableChanged(e: any) {
    if (e.field.selected) {
      if (this.ws.SelectedFields.indexOf(e.field)==-1) {
        this.ws.SelectedFields.push(e.field);
      }
    } else {
      var idx = this.ws.SelectedFields.indexOf(e.field);
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
        if (f.groupType == "") {
          f.groupType = "Group";
        }
      })
    }
  }

}
