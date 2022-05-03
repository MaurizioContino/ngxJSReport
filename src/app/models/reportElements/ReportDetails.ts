import { FieldModel } from "../FieldModel";
import { IReportElement } from "./IReportElement";

export class ReportDetails implements IReportElement {

  public ElementType: any = 'Detail';
  public Visible: boolean = true;
  public ElementName!: string;
  public Fields: FieldModel[] = [];



}
