import { Component, OnInit } from '@angular/core';
import { FieldModel } from 'src/app/models/FieldModel';
import { GroupField } from 'src/app/models/reportElements/GroupField';
import { IReportElement } from 'src/app/models/reportElements/IReportElement';
import { ReportDetails } from 'src/app/models/reportElements/ReportDetails';
import { ReportField } from 'src/app/models/reportElements/ReportField';
import { ReportGroup } from 'src/app/models/reportElements/ReportGroup';
import { ReportGroupHeader } from 'src/app/models/reportElements/ReportGroupHeader';
import { ReportModel } from 'src/app/models/ReportModel';
import { JSReportService } from 'src/app/services/JSReportService';
import { WorkspaceService } from 'src/app/services/Workspace.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  report: ReportModel = new ReportModel();
  currentElement: any = null;
  currentObj: any;
  currentProperties: any[] = [];
  constructor(private rep: JSReportService, private ws: WorkspaceService) {}

  ngOnInit(): void {
    this.report.Name = 'Test Report';
  }
  getContex(e: IReportElement) {
    return { $implicit: e };
  }
  SelectElement(event: any, obj: any, e: IReportElement) {
    event.stopPropagation()
    if (this.currentObj) {
      this.currentObj.style.border = '0px';
    }
    this.currentObj = obj;
    this.currentElement = e;
    this.SetPropertiesOfCurrent();
    this.currentObj.style.border = '2px solid orangered';
  }
  SetPropertiesOfCurrent() {
    this.currentProperties = []
    Object.keys(this.currentElement!).forEach((key) => {

      const value: any = (this.currentElement! as any)[key];
      const type: string = typeof (this.currentElement! as any)[key];

      switch (key) {
        case 'ElementType':
          this.currentProperties.push({name: key, value: value, readonly: true, type: 'string'});
          break;
        case 'ElementName':
          this.currentProperties.push({name: key, value: value, readonly: true, type: 'string'});
          break;
        case 'Fields':
          break
        default:
          this.currentProperties.push({name: key, value: value, reaonly: false, type: type});
      }
    });
  }
  dropGroupBreak(e: any, g: IReportElement){

    if (g.ElementType=='Group'){
      var container = (g as ReportGroup);
      container.BreakFields.push(new GroupField(e.previousContainer.data[e.previousIndex]));
    }
  }
  dropGroup(e: any, g: IReportElement){

    if (g.ElementType=='Group'){
      var container = (g as ReportGroup);
      container.Fields.push(new GroupField(e.previousContainer.data[e.previousIndex]));
    }
  }
  RemoveGroup(g: IReportElement, f: GroupField){
    var container = g as ReportGroup;
    container.Fields.splice(container.Fields.indexOf(f), 1);
  }
  dropDetails(e: any, g: IReportElement){

    if (g.ElementType=='Detail'){
      var container = (g as ReportDetails);
      var f = e.previousContainer.data[e.previousIndex] as FieldModel;
      container.Fields.push(new ReportField(f));
    }
  }

  RemoveGroupBreak(g: IReportElement, f: GroupField){

      var container = g as ReportGroup;
      container.BreakFields.splice(container.BreakFields.indexOf(f), 1);

  }

  RemoveField(g: IReportElement, f: ReportField){
    var container = g as ReportDetails;
    container.Fields.splice(container.Fields.indexOf(f), 1);
  }

  fai(){
    this.rep.run(this.report, this.ws.GetQueryModel());
  }
}
