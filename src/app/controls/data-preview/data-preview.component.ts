import { Component, OnInit } from '@angular/core';
import { FieldModel } from 'src/app/models/FieldModel';
import { WorkspaceService } from 'src/app/services/Workspace.service';

@Component({
  selector: 'app-data-preview',
  templateUrl: './data-preview.component.html',
  styleUrls: ['./data-preview.component.scss']
})
export class DataPreviewComponent implements OnInit {

  Data : any[] = [];

  constructor(public ws: WorkspaceService) { }

  ngOnInit(): void {

  }

  GetData(e: any) {
    e.stopPropagation();
    this.ws.GetData(1,10).subscribe(v=>{
      this.Data = v;
    })
  }

  gettableFields() {
    if (this.ws.SelectedFields.length>0)
    {
      return this.ws.SelectedFields
    } else {
      var ret: FieldModel[] = []
      Object.keys(this.ws.Tables).map(k=>{
        ret.push(...this.ws.Tables[k].Fields);
      })
      return ret;
    }
  }
}
