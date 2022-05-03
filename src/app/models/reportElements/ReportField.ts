import { FieldModel } from "../FieldModel";
import { IReportElement } from "./IReportElement";

export class ReportField implements IReportElement {

  ElementType : any = 'Field'
  ElementName = 'Value field';

  label: string;
  baseField!: FieldModel;

  labelVisible: boolean = true;
  labelWidth = 20;
  valueWidth = 20;
  labelClass?: string;
  valueClass?: string;

  constructor(field: FieldModel) {
    this.baseField = field;
    this.label = field.name;
    this.labelVisible = false;
    this.labelClass = '';
    this.valueClass = '';
  }

}
