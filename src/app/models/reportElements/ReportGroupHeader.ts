import { IReportElement } from "./IReportElement";

export class ReportGroupHeader implements IReportElement {

  public ElementType: any = 'GroupHeader';
  public Visible: boolean = true;
  public ElementName!: string;


}
