import { FieldModel } from "../FieldModel";
import { GroupField } from "./GroupField";
import { IReportElement } from "./IReportElement";
import { ReportDetails } from "./ReportDetails";
import { ReportGroupFooter } from "./ReportGroupFooter";
import { ReportGroupHeader } from "./ReportGroupHeader";

export class ReportGroup implements IReportElement {

  public ElementType: any = 'Group';
  public Visible: boolean = true;
  public ElementName!: string;
  public BreakOn:string = "";

  public GroupHeader = new ReportGroupHeader();
  public GroupFooter = new ReportGroupFooter();
  public BreakFields: GroupField[] = [];
  public Fields: GroupField[] = [];
  public child: IReportElement =  new ReportDetails();



}
