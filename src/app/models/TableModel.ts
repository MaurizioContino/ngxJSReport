import { FieldComponent } from '../controls/field/field.component';
import { FieldModel } from './FieldModel';



export class TableModel {

  private _fields: FieldModel[] = [];

  private _name: string = "table";
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
    this.fields.forEach(field => {
      field.parent = value;
    });
  }



  public originalname!: string;

  public get fields(): FieldModel[] {
    return this._fields;
  }

  Clone(name: string) {
    var fields:FieldModel[] = [];
    this.fields.forEach(v=>{
      fields.push(new FieldModel(v.originalname, v.type, v.size,name))
    })
    var ret = new TableModel(name, fields, this.originalname)

    return ret;

  }
  constructor(name: string, fields: FieldModel[], originalName: string | null = null) {
    this._name = name;
    this.originalname = originalName ? originalName : name;
    this._fields = fields;
    this._fields.forEach(field => {
      field.parent = this.name;
    });
  }


  public addfield(name: string, type: string, size: string) {
    const field = new FieldModel(name, type, size, this.name);
    this._fields.push(field);
  }



}
