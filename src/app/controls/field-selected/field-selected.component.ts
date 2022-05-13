import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FieldModel } from 'src/app/models/FieldModel';
import { WorkspaceService } from 'src/app/services/Workspace.service';

@Component({
  selector: 'app-field-selected',
  templateUrl: './field-selected.component.html',
  styleUrls: ['./field-selected.component.scss'],
})
export class FieldSelectedComponent implements OnInit {
  GroupTypes = ['', 'Group', 'Sum', 'Count'];

  constructor(public ws: WorkspaceService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {

    this.ws.onWorkspaceChange.subscribe(v=>{
      this.cdr.detectChanges();
    })

  }
  groupCheck() {
    if (this.ws.anyGroup()) {
      this.ws.SelectedFields.forEach((f) => {
        if (f.GroupType == '') {
          f.GroupType = 'Group';
        }
      });
    }
  }
  Delete(f:FieldModel) {
    this.ws.RemoveField(f);
  }


  drop(event: CdkDragDrop<any>, e: any) {

    //

    if (event.previousContainer == event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);\
    }
  }
}
