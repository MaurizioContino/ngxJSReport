import { FieldModel } from "../FieldModel";
import { IReportElement } from "./IReportElement";

export class ReportTitle implements IReportElement {

  ElementType : any = 'Field'
  ElementName = 'Report title';
  Title: string;
  Class?: string;

  constructor(field:  | null) {
    this.Title = 'Report title';
    this.Class = 'title';
  }

}
