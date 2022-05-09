import { Component, OnInit } from '@angular/core';
import { FieldModel } from 'src/app/models/FieldModel';
import { FilterModel } from 'src/app/models/FilterModel';
import { TableModel } from 'src/app/models/TableModel';
import { WorkspaceService } from 'src/app/services/Workspace.service';

@Component({
  selector: 'app-filter',

  templateUrl: './filter.component.html',

  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  FilterTypes: any[] = [
   {label: '=',           value: '='},
   {label: '!=',          value: '!='},
   {label: '>',           value: '>'},
   {label: '<',           value: '<'},
   {label: '>=',          value: '>='},
   {label: '<=',          value: '<='},
   {label: 'like',        value: 'like'},
   {label: 'not like',    value: 'not like'},
   {label: 'in',          value: 'in'},
   {label: 'not in',      value: 'not in'},
   {label: 'is null',     value: 'is null'},
   {label: 'is not null', value: 'is not null'},
   {label: 'between',     value: 'between'},
   {label: 'not between', value: 'not between'},
  ];
  constructor(public ws: WorkspaceService) { }

  ngOnInit(): void {
  }
  GetFields(): FieldModel[] {
    var ret: FieldModel[] = []

    Object.keys(this.ws.Tables).forEach(t => {
      (this.ws.Tables[t] as TableModel).Fields.forEach((f: FieldModel) => {
        ret.push(f)
      });
    });
    return ret;
  }
  newfilter(){
    this.ws.Filters.push(new FilterModel());
    this.ws.workspaceChanged();
  }
}
