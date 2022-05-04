import { FieldComponent } from '../controls/field/field.component';
import { FieldModel } from './FieldModel';



export class TableModel {

  private _fields: FieldModel[] = [];
  private _name: string = "table";


  public OriginalName!: string;
  public get Name(): string {return this._name;}
  public set Name(value: string) {
    this._name = value;
    this.Fields.forEach(field => {field.Parent = value;});
  }
  public get Fields(): FieldModel[] {return this._fields;}




  Clone(name: string) {
    var fields:FieldModel[] = [];
    this.Fields.forEach(v=>{
      fields.push(new FieldModel(v.OriginalName, v.FieldType, v.Size,name))
    })
    var ret = new TableModel(name, fields, this.OriginalName)

    return ret;

  }
  constructor(name: string, fields: FieldModel[], originalName: string | null = null) {
    this._name = name;
    this.OriginalName = originalName ? originalName : name;
    this._fields = fields;
    this._fields.forEach(field => {
      field.Parent = this.Name;
    });
  }


  public addfield(name: string, type: string, size: string) {
    const field = new FieldModel(name, type, size, this.Name);
    this._fields.push(field);
  }



}
