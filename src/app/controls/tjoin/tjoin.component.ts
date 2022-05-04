import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { JoinModel } from 'src/app/models/JoinModel';
import { WorkspaceService } from 'src/app/services/Workspace.service';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import { faCircle as farCirce } from '@fortawesome/free-regular-svg-icons';
import { faCircle as fasCirce } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-tjoin',
  templateUrl: './tjoin.component.html',
  styleUrls: ['./tjoin.component.scss']
})
export class TjoinComponent implements OnInit {

  @Input() join!: JoinModel
  coordinates : any = null;

  constructor(private ws: WorkspaceService, private cdr: ChangeDetectorRef) {


   }


  ngOnInit(): void {
    this.ws.onWorkspaceChange.subscribe((ws: WorkspaceService ) => {
      this.cdr.detectChanges();
    });
  }

  // get coordinates of left side of the join
  getCoordinates() {

    if (!this.join) {
      return {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
      }
    }
    var id1 = this.join.f1.Id;
    var id2 = this.join.f2.Id;

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


    return {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2
    }
  }



}
