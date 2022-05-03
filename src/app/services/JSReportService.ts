import { Injectable } from '@angular/core';
import jsreport from '@jsreport/browser-client'
import { ReportModel } from '../models/ReportModel';

@Injectable({
  providedIn: 'root'
})
export class JSReportService {

  constructor() { }



  private parser(report: ReportModel) : string {


    var ret = "";
    ret += `<div class='${report.title.Class}'> ${report.title.Title} </div>`;
    return `<html>
      <head>
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/metro/4.1.5/css/metro.min.css">
         <style>
          .title {
            font-size: 45px;
            line-height: 45px;
            color: gray;
          }
          .label {

            font-weight: bold;
            font-size: 14px;
          }
          .value {
            font-size: 14px;
          }
        </style>
      </head>
      <body>
      ${ret}
      </body>
    </html>`;


  }

  async run(report: ReportModel) {
    (jsreport as any).serverUrl = 'http://localhost:5488';

    const rep = await jsreport.render({
      template: {
        content: this.parser(report),
        engine: 'handlebars',
        recipe: 'chrome-pdf'
      },
      data: {
        someData: 'hello',

      }
    })
    // download the output to the file
    //rep.download('myreport.pdf')

    // open output in the new window
    rep.openInWindow()
  }

}
