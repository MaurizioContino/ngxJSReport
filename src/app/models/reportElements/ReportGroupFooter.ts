import { IReportElement } from "./IReportElement";

export class ReportGroupFooter implements IReportElement {

  public ElementType: any = 'GroupFooter';
  public Visible: boolean = true;
  public ElementName!: string;


}
