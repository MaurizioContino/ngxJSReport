import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { FieldModel } from '../models/FieldModel';
import { JoinModel } from '../models/JoinModel';
import { ReportModel } from '../models/ReportModel';
import { TableModel } from '../models/TableModel';


@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  public Joins: JoinModel[] = [];
  public AvailableTables = new BehaviorSubject<TableModel[]>([]);
  public Tables: any = {};
  public JoinsChanged = new EventEmitter<JoinModel[]>();
  public onWorkspaceChange = new Subject<any>();
  private idTable = 0;
  public Distinct = false;
  SelectedFields: FieldModel[] = [];

  constructor(private http: HttpClient) {

   }

   getAvailableTable() {

      this.http.get<TableModel[]>('https://localhost:7009/Database').subscribe(data => {
        this.AvailableTables.next(data.map(x => new TableModel(x.Name, x.Fields)));

      });

   }


  public addtable(table: TableModel) {
    this.idTable++;
    var name = "T" + this.idTable
    this.Tables[name] = table.Clone(name);

  }


  public AddJoin(join: JoinModel) {
    this.Joins.push(join);
    this.JoinsChanged.emit(this.Joins);
  }
  public RemoveJoin(join: JoinModel) {
    this.Joins.splice(this.Joins.indexOf(join), 1);
    this.JoinsChanged.emit(this.Joins);
  }
  public GetJoins() {
    return this.Joins;
  }
  public ClearJoins() {
    this.Joins = [];
    this.JoinsChanged.emit(this.Joins);
  }
  // add join by elements
  public AddJoinByElements(f1: FieldModel, f2: FieldModel) {
    let join = new JoinModel(f1, f2);
    this.AddJoin(join);
  }
  //remove join by elements
  public RemoveJoinByElements(f1: FieldModel, f2: FieldModel) {
    let join = new JoinModel(f1, f2);
    this.RemoveJoin(join);
  }

  public GetField(tablename: string, fieldname: string) {
    var ret = null;
    this.Tables[tablename].fields.forEach((element: FieldModel) => {
      if (element.Name == fieldname) {
        ret = element;
      }
    });
    return ret;
  }

  anyGroup(): boolean {

    return this.SelectedFields.some(x => x.GroupType != "");

  }

  workspaceChanged() {
    this.onWorkspaceChange.next(this);
  }


  getJoinName(type: number) {
    switch(type) {
      case 0:
        return "INNER JOIN";
      case 1:
        return "LEFT JOIN";
      case 2:
        return "RIGHT JOIN";
      case 3:
        return "CROSS JOIN";
      default:
          return "INNER JOIN";
    }
  }
  // calculate query

  GetQuery() {

    var select = this.CalculateSelect();
    var from = this.CalculateFrom();
    var groupby = this.CalculateGroupBy();
    var where = "";
    var sort = "";

    return select + " \n" + from + " \n" + groupby + " \n" + where + " \n" + sort;

  }

  CalculateGroupBy() {

    var filtered = this.SelectedFields.filter(f=> f.GroupType == "Group");
    if (filtered.length>0) {

      return  "Group by \n" + filtered.map(f=> '\t' + f.OriginalName ).join('\n, ');
    }
    return "";
  }



  CalculateSelect() {
    var tmp = "SELECT ";
    if (this.SelectedFields.length>0) {
      tmp +=  this.SelectedFields.map((f: FieldModel) => {
        return '\n\t' + (f.GroupType ==  "" || f.GroupType == "Group" ?  f.OriginalName : f.GroupType + '(' + f.OriginalName + ')'  + " as " + f.Name)
      }).join(',')
    } else {
      tmp += "*"
    }
    return tmp;
  }


  CalculateFrom() {
    var tables = Object.keys(this.Tables).map((v) => { return this.Tables[v] as TableModel; });
    if (this.Joins.length > 0) {

      var tmp = "";

      for (var i = 0; i < tables.length; i++) {
        for (var j = 0; j < tables.length; j++) {
          if (i != j) {
            if (tmp == "")
              tmp = '\t' + tables[i].OriginalName + " " + tables[i].Name;
            var cjoins = this.Joins.filter(x => x.f1.Parent == tables[i].Name && x.f2.Parent == tables[j].Name);
            if (cjoins.length > 0) {

              tmp += " \n" + this.getJoinName(cjoins[0].JoinType) + " \n\t" + tables[j].OriginalName + " " + tables[j].Name +
                " ON ";
              tmp += cjoins.map((j: JoinModel) => {
                return j.f1.Id.replace("_", ".") + " = " + j.f2.Id.replace("_", ".");
              }).join(" AND ");

            }
          }
        }
      }
      return "FROM " + tmp;
    } else {
      if (tables.length > 0) {
        return "FROM " + tables[0].OriginalName + " as " + tables[0].Name;
      }
      else {
        return "";
      }
    }
  }

}
