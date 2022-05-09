import { Component, OnInit } from '@angular/core';
import { JoinModel } from 'src/app/models/JoinModel';
import { WorkspaceService } from 'src/app/services/Workspace.service';

@Component({
  selector: 'app-join-icons',
  templateUrl: './join-icons.component.html',
  styleUrls: ['./join-icons.component.scss']
})
export class JoinIconsComponent implements OnInit {

  currjoin?: JoinModel
  constructor(public ws: WorkspaceService) { }

  ngOnInit(): void {
  }

  // get coordinates of left side of the join
  getCoordinates(join: any) {


    var id1 = join.f1.Id;
    var id2 = join.f2.Id;

    var e1 = document.getElementById(id1)
    var e2 = document.getElementById(id2)


    var x1 = e1!.getBoundingClientRect().left  + e1!.getBoundingClientRect().width;
    var y1 = e1!.getBoundingClientRect().top + 10;

    var y1min = (e1 as any).parentElement.parentElement.parentElement.getBoundingClientRect().top + 10;
    if (y1 < y1min) y1 = y1min - 20;

    var y1max = (e1 as any).parentElement.parentElement.parentElement.getBoundingClientRect().top + (e1 as any).parentElement.parentElement.parentElement.getBoundingClientRect().height;
    if (y1 > y1max) y1 = y1max;



    var x2 = e2!.getBoundingClientRect().left;
    var y2 = e2!.getBoundingClientRect().top + 10;

    var y2min = (e2 as any).parentElement.parentElement.parentElement.getBoundingClientRect().top + 10;
    if (y2 < y2min) y2 = y2min - 20;
    var y2max = (e2 as any).parentElement.parentElement.parentElement.getBoundingClientRect().top + (e2 as any).parentElement.parentElement.parentElement.getBoundingClientRect().height;
    if (y2 > y2max) y2 = y2max;

    var dx = (x2 - x1) / 2;
    var dy = (y2 - y1) / 2;

    return {
      x1: x1,
      y1: y1,
      x2: x2 - dx + 10,
      y2: y2 - dy
    }
  }

  ShowPanel(e: any, op: any, j: any) {
    this.currjoin = j;
    op.show(e);
  }
}
