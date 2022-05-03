import { Component } from '@angular/core';
import { FieldModel } from './models/FieldModel';
import { TableModel } from './models/TableModel';
import { WorkspaceService } from './services/Workspace.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngxJSReport';

  constructor(private ws: WorkspaceService) {

    var t1 = new TableModel('table1', [
      new FieldModel('id1', 'int', '0', 'table1'),
      new FieldModel('name1', 'string', '0', 'table1'),
      new FieldModel('name2', 'string', '0', 'table1'),
      new FieldModel('name3', 'string', '0', 'table1'),
      new FieldModel('name4', 'string', '0', 'table1'),
      new FieldModel('name5', 'string', '0', 'table1'),
      new FieldModel('name6', 'string', '0', 'table1'),
      new FieldModel('name7', 'string', '0', 'table1'),
      new FieldModel('name8', 'string', '0', 'table1'),
      new FieldModel('name9', 'string', '0', 'table1'),
      new FieldModel('name10', 'string', '0', 'table1'),
      new FieldModel('name11', 'string', '0', 'table1'),
    ]);

    var t2 = new TableModel('table2', [
      new FieldModel('id2', 'int', '0', 'table2'),
      new FieldModel('name2', 'string', '0', 'table2'),
    ]);

    ws.AvailableTables['table1'] =  t1;
    ws.AvailableTables['table2'] =  t2;

  }
}
