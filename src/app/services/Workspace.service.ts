import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthModel } from '../models/AuthModel';
import { FieldModel } from '../models/FieldModel';
import { FilterModel } from '../models/FilterModel';
import { JoinModel } from '../models/JoinModel';
import { QueryModel } from '../models/QueryModel';
import { ReportModel } from '../models/ReportModel';
import { TableModel } from '../models/TableModel';


@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {


  public query: QueryModel = new QueryModel();

  public get Joins(): JoinModel[] {
    return this.query.Joins;
  }
  public set Joins(value: JoinModel[]) {
    this.query.Joins = value;
  }

  public get Tables(): any {
    return this.query.Tables;
  }
  public set Tables(value: any) {
    this.query.Tables = value;
  }


  public get Filters(): FilterModel[] {
    return this.query.Filters;
  }
  public set Filters(value: FilterModel[]) {
    this.query.Filters = value;
  }

  public get Havings(): any {
    return this.query.Havings;
  }
  public set Havings(value: any) {
    this.query.Havings = value;
  }

  public get SelectedFields(): FieldModel[] {
    return this.query.SelectedFields;
  }
  public set SelectedFields(value: FieldModel[]) {
    this.query.SelectedFields = value;
  }

  public AvailableTables = new BehaviorSubject<TableModel[]>([]);

  public JoinsChanged = new EventEmitter<JoinModel[]>();
  public onWorkspaceChange = new Subject<any>();
  private idTable = 0;
  public Distinct = false;
  sessionId: string = "";

  constructor(private http: HttpClient) {

   }

   getAvailableTable(auth: AuthModel):Subject<any> {
      var ret = new Subject<any>();
      this.http.post<any>('https://localhost:7009/Database', auth).subscribe(data => {

        this.AvailableTables.next((data.Tables as TableModel[]).map(x => new TableModel(x.Name, x.Fields)).sort((a, b) => a.Name.localeCompare(b.Name)));
        this.sessionId = data.SessionId;
        ret.next(this.sessionId);
      });
      return ret;
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
    if (this.Tables[tablename]) {
      this.Tables[tablename].Fields.forEach((element: FieldModel) => {
        if (element.Name == fieldname) {
          ret = element;
        }
      });
    }
    return ret;
  }

  anyGroup(): boolean {

    return this.SelectedFields.some(x => x.GroupType != "");

  }

  workspaceChanged() {
    this.onWorkspaceChange.next(this);
  }

  renameTable(oldname: string, newname: string) {
    var newtablelist: any = {};
    for (var key in this.Tables) {
      if (key == oldname) {
        newtablelist[newname] = this.Tables[key];
        newtablelist[newname].Name = newname;
        newtablelist[newname].Fields.forEach((f:FieldModel) => {
          this.Joins.forEach(j => {
            if (j.f1.Id ==f.Id) j.f1.Id =  newname + "_" + f.OriginalName;
            if (j.f2.Id ==f.Id) j.f2.Id =  newname + "_" + f.OriginalName;
          });
          f.Id = newname + "_" + f.OriginalName;
          f.Parent = newname;
        })
      } else {
        newtablelist[key] = this.Tables[key];
      }
    }
    this.Tables = newtablelist;

  }

  RemoveTable(table: TableModel) {

    this.Joins.forEach(j => {
      if (j.f1.Parent == table.Name || j.f2.Parent == table.Name) {
        this.RemoveJoin(j);
      }
    });
    var df = this.SelectedFields.filter(x => x.Parent == table.Name);
    df.forEach(f => {
        this.RemoveField(f)
    });
    delete this.Tables[table.Name];
  }

  RemoveField(f: FieldModel) {
    this.SelectedFields.splice(this.SelectedFields.indexOf(f), 1);
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
    var where = this.CalculateWhere();
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
        return '\n\t' + (f.GroupType ==  "" || f.GroupType == "Group" ?  f.OriginalName : f.GroupType + '(' + f.OriginalName + ')')  + " as " + f.Name
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
  CalculateWhere() {
    var tmp = "";
    var filters = this.Filters.filter((v:FilterModel)=>v.Field && v.Value);
    if (filters.length>0) {
      tmp = "WHERE ";
      tmp +=  filters.map((f: FilterModel) => {
        return '\n\t' + (f.Field.Id.replace("_", ".")  + " " + f.Operator + " " + this.getValue(f) );
      }).join(' AND ')
    }
    return tmp;
  }
  getValue(filter: FilterModel) {
    var ft = filter.Field.FieldType.toLowerCase();
    if (filter.Value && !filter.Value.startsWith("@") && (filter.Field.FieldType == "varchar" || filter.Field.FieldType == "char" || filter.Field.FieldType == "date" || filter.Field.FieldType == "datetime")) {
      return "'" + filter.Value + "'";
    } else {
      return filter.Value;
    }
  }


  GetQueryModel(): QueryModel {
    var q = JSON.parse(JSON.stringify(this.query));
    q.Tables  = {} as any;
    q.SessionId = this.sessionId;
    for (var key in this.Tables) {
      q.Tables[key] = {
        OriginalName : this.Tables[key].OriginalName,
        Name : this.Tables[key].Name,
        Fields : this.Tables[key].Fields,

      };
    }
    return q;
  }

  GetData(page: number, pagesize: number): Observable<any[]> {
    var ret = new Subject<any[]>();
    var q = this.GetQueryModel();
    q.PageSize  = pagesize;
    q.Page = page;
    q.SessionId = this.sessionId;

    this.http.post<any[]>('https://localhost:7009/Queries', q).subscribe(data => {
      ret.next(data);
    });
    return ret;

  }
}
