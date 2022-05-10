import { FieldModel } from "../FieldModel";
import { IReportElement } from "./IReportElement";
import { ReportField } from "./ReportField";

export class ReportDetails implements IReportElement {

  public ElementType: any = 'Detail';
  public Visible: boolean = true;
  public ElementName!: string;
  public Fields: ReportField[] = [];



}
