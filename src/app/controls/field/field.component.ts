import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Fetch from 'd3-fetch';
import * as d3Force from 'd3-force';
import { CdkDragDrop, CdkDragEnd } from '@angular/cdk/drag-drop';
import { WorkspaceService } from 'src/app/services/Workspace.service';
import { FieldModel } from 'src/app/models/FieldModel';
import { JoinModel } from 'src/app/models/JoinModel';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
})
export class FieldComponent implements OnInit {

  @Input() field!: FieldModel
  @Output() OnFieldChange = new EventEmitter<FieldModel>()

  joins:any[] = []
  showFieldType = false;
  constructor(private ws: WorkspaceService) {}

  ngOnInit() {

  }


  drop(event: CdkDragDrop<any>, e: any) {

    //

    if (event.previousContainer !== event.container) {
      var e1 = event.previousContainer.id.split("_");
      var f1 = this.ws.GetField(e1[0], e1[1])!;

      var e2 = event.container.id.split("_");
      var f2 = this.ws.GetField(e2[0], e2[1])!;

      var j = new JoinModel(f1, f2);
      this.ws.AddJoin(j)
    }
  }
  EmitFieldChange(field: FieldModel) {
    var v = JSON.parse(JSON.stringify(field)) as FieldModel ;
    v.Selected = true;
    this.ws.SelectedFields.push(v);
    this.OnFieldChange.emit(v);
  }
  GroupFieldChange(field: FieldModel) {
    if (field.GroupType != "") {
      var v = JSON.parse(JSON.stringify(field)) as FieldModel ;
      v.Selected = true;
      this.ws.SelectedFields.push(v);
      this.OnFieldChange.emit(v);
      field.Selected = true;
    }
    this.OnFieldChange.emit(field);
  }
  show(op: any, e: any) {
    op.show(e)
  }
}
