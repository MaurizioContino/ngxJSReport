import { IReportElement } from "./reportElements/IReportElement";
import { ReportDetails } from "./reportElements/ReportDetails";
import { ReportGroup } from "./reportElements/ReportGroup";
import { ReportGroupFooter } from "./reportElements/ReportGroupFooter";
import { ReportGroupHeader } from "./reportElements/ReportGroupHeader";
import { ReportTitle } from "./reportElements/ReportTitle";

export class ReportModel {

  public Name!: string;

  public title = new ReportTitle(null);
  public mainGroup =  new ReportGroup();
  public Details = new ReportDetails();


  constructor() {
    this.title.Title = "Report title";
  }



}
