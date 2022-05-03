
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FieldModel } from 'src/app/models/FieldModel';
import { WorkspaceService } from 'src/app/services/Workspace.service';
import { TableModel } from '../../models/TableModel';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() Table!: TableModel;
  @Output() onScroll = new EventEmitter<any>();
  @Output() onTableChange = new EventEmitter<any>();

  constructor(private ws: WorkspaceService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.ws.onWorkspaceChange.subscribe((ws: WorkspaceService) => {
      this.cdr.detectChanges();
    });

  }
  EmitTableChange(f: FieldModel){
    this.onTableChange.emit({table: this.Table, field: f });
  }
  scrolled(e: any) {
    this.onScroll.emit(e);
  }
}
