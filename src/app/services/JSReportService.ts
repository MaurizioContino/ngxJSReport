import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { faWindows } from '@fortawesome/free-brands-svg-icons';
import jsreport from '@jsreport/browser-client'
import { QueryModel } from '../models/QueryModel';
import { GroupField } from '../models/reportElements/GroupField';
import { ReportGroup } from '../models/reportElements/ReportGroup';
import { ReportModel } from '../models/ReportModel';

@Injectable({
  providedIn: 'root'
})
export class JSReportService {

  constructor(private http: HttpClient) { }


  private GetGroup(group: ReportGroup) {
    var ret = "";
    if (group.Visible) {
      ret += `<div class="group-header">`;
      group.Fields.forEach((f: GroupField) => {
        ret += `<div class="group-label">${f.label}</div>`;
      });
      ret += `</div>`;


    }
    return ret;
  }


  private parser(report: ReportModel) : string {


    var ret = "";

    ret += `<div class='${report.title.Class}'> ${report.title.Title} </div>`;
    ret += this.GetGroup(report.mainGroup);

    return `<html>
      <head>
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/metro/4.1.5/css/metro.min.css">

         <style>
          {{asset "/Sinelec/Shared/global.css" "utf8"}}
        </style>
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
      q : q
    }
    this.http.post('https://localhost:7009/report', req, { responseType: 'blob' })
    .subscribe(res => {
        const fileUrl = URL.createObjectURL(res);
        window.open(fileUrl);
    });

  }

}
