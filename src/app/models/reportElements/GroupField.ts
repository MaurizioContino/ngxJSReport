import { FieldModel } from "../FieldModel";
import { ReportField } from "./ReportField";

export class GroupField extends ReportField {


  public BreakOn: boolean = true;
  constructor(field: FieldModel) {
    super(field);
    this.BreakOn = true;
    this.labelVisible = true;
    this.labelClass='label'
    this.valueClass='value'

  }


}
