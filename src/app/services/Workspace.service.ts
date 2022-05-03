import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FieldModel } from '../models/FieldModel';
import { JoinModel } from '../models/JoinModel';
import { ReportModel } from '../models/ReportModel';
import { TableModel } from '../models/TableModel';


@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  public Joins: JoinModel[] = [];
  public AvailableTables: any = {};
  public Tables: any = {};
  public JoinsChanged = new EventEmitter<JoinModel[]>();
  public onWorkspaceChange = new Subject<any>();
  private idTable = 0;
  public Distinct = false;
  SelectedFields: FieldModel[] = [];

  constructor() { }


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
      if (element.name == fieldname) {
        ret = element;
      }
    });
    return ret;
  }

  anyGroup(): boolean {

    return this.SelectedFields.some(x => x.groupType != "");

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

    return select + " " + from + " " + groupby + " " + where + " " + sort;

  }

  CalculateGroupBy() {

    var filtered = this.SelectedFields.filter(f=> f.groupType == "Group");
    if (filtered.length>0) {

      return  "Group by " + filtered.map(f=> f.originalname).join(', ');
    }
    return "";
  }



  CalculateSelect() {
    var tmp = "SELECT ";
    if (this.SelectedFields.length>0) {
      tmp +=  this.SelectedFields.map((f: FieldModel) => {
        return f.groupType ==  "" || f.groupType == "Group" ?  f.originalname : f.groupType + '(' + f.originalname + ')'  + " as " + f.name
      }).join(', ')
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
              tmp = tables[i].originalname + " " + tables[i].name;
            var cjoins = this.Joins.filter(x => x.f1.parent == tables[i].name && x.f2.parent == tables[j].name);
            if (cjoins.length > 0) {

              tmp += " " + this.getJoinName(cjoins[0].joinType) + " " + tables[j].originalname + " " + tables[j].name +
                " ON ";
              tmp += cjoins.map((j: JoinModel) => {
                return j.f1.id.replace("_", ".") + " = " + j.f2.id.replace("_", ".");
              }).join(" AND ");

            }
          }
        }
      }
      return "FROM " + tmp;
    } else {
      if (tables.length > 0) {
        return "FROM " + tables[0].originalname + " as " + tables[0].name;
      }
      else {
        return "";
      }
    }
  }

}
