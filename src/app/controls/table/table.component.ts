
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

  TableName: string = "";


  constructor(private ws: WorkspaceService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.TableName = this.Table.Name;
    this.ws.onWorkspaceChange.subscribe((ws: WorkspaceService) => {
      this.cdr.detectChanges();
    });

  }
  public Rename() {
    if (this.Table.Name != this.TableName) {
      if (this.ws.Tables[this.TableName]){
        alert("Table with this name already exists");
        this.TableName = this.Table.Name;
      } else {
        this.ws.renameTable(this.Table.Name, this.TableName);
      }

     }
  }

  EmitTableChange(f: FieldModel){
    this.onTableChange.emit({table: this.Table, field: f });
  }
  scrolled(e: any) {
    this.onScroll.emit(e);
  }
  delete() {
    this.ws.RemoveTable(this.Table);
  }
}
