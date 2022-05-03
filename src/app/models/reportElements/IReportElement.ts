import { FieldModel } from "../FieldModel";

export interface IReportElement {

  ElementType: 'Group' |'GroupHeader' | 'GroupFooter' | 'ReportHeader' | 'ReportFooter' | 'Detail' | 'Group' | 'Report' | 'Field';
  ElementName: string

}
