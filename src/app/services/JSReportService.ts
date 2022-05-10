import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { faWindows } from '@fortawesome/free-brands-svg-icons';
import jsreport from '@jsreport/browser-client'
import { json } from 'd3';
import { QueryModel } from '../models/QueryModel';
import { GroupField } from '../models/reportElements/GroupField';
import { ReportDetails } from '../models/reportElements/ReportDetails';
import { ReportField } from '../models/reportElements/ReportField';
import { ReportGroup } from '../models/reportElements/ReportGroup';
import { ReportModel } from '../models/ReportModel';

@Injectable({
  providedIn: 'root'
})
export class JSReportService {

  constructor(private http: HttpClient) { }


  private GetGroupsHeaders(group: ReportGroup) {
    var ret = "";
    if (group.Visible) {
      ret += `<div class="group-header">`;
      group.Fields.forEach((f: GroupField) => {
        ret += `<div class="group-label">${f.label}: ${f.label}</div>`;
      });
      ret += `</div>`;
    }
    if (group.child){
      ret += this.GetGroupsHeaders(group.child as ReportGroup);
    }
    return ret;
  }


  private GetDetails(detail: ReportDetails) {
    var ret = "";

      ret += `<table class='table striped'>
        <thead>
          <tr>`;
      detail.Fields.forEach((f: ReportField) => {
        ret += `<th>${f.label}</th>`;
      });
      ret += `</tr></thead></table>`;

    return ret;
  }




  private parser(report: ReportModel) : string {


    var ret = "";

    ret += `<div class='${report.title.Class}'> ${report.title.Title} </div>`;
    ret += this.GetGroupsHeaders(report.mainGroup);
    ret += this.GetDetails(report.Details);

    return `<html>
      <head>
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/metro/4.1.5/css/metro.min.css">


      </head>
      <body>
      ${ret}
      </body>
    </html>`;


  }

  async run(report: ReportModel, q: QueryModel) {
    (jsreport as any).serverUrl = 'http://localhost:5488';

    var req = {
      Content: this.parser(report),
      q : q,
      ReportModel: JSON.stringify(report)
    }
    this.http.post('https://localhost:7009/report', req, { responseType: 'blob' })
    .subscribe(res => {
        const fileUrl = URL.createObjectURL(res);
        window.open(fileUrl);
    });

  }

}
