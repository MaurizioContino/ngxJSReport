import { Component, Input, OnInit } from '@angular/core';
import { TableModel } from 'src/app/models/TableModel';
import { WorkspaceService } from 'src/app/services/Workspace.service';

@Component({
  selector: 'app-table-selection',
  templateUrl: './table-selection.component.html',
  styleUrls: ['./table-selection.component.scss']
})
export class TableSelectionComponent implements OnInit {


  private _AvailableTables: TableModel[] = [];
  @Input()
  public get AvailableTables(): TableModel[] {
    return this._AvailableTables;
  }
  public set AvailableTables(value: TableModel[]) {
    this._AvailableTables = value;
    this.filtertext = "";
  }
  FilteredTable: any[] = [];

  private _filtertext: string = "";
  public get filtertext(): string {
    return this._filtertext;
  }
  public set filtertext(value: string) {
    this._filtertext = value;
    if (value && value.length > 0) {
      this.FilteredTable = this.AvailableTables.filter(t => t.Name.toLowerCase().includes(value.toLowerCase()));
    } else {
      this.FilteredTable = this.AvailableTables;
    }
  }

  constructor(private ws: WorkspaceService) { }

  ngOnInit(): void {
  }

  AddTable(t: TableModel) {

    this.ws.addtable(t)
  }
}
