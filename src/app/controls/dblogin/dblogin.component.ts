import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthModel } from 'src/app/models/AuthModel';

@Component({
  selector: 'app-dblogin',
  templateUrl: './dblogin.component.html',
  styleUrls: ['./dblogin.component.scss']
})
export class DBLoginComponent implements OnInit {

  @Output() Login = new EventEmitter<AuthModel>()

  constructor() { }

  auth = new AuthModel();

  ngOnInit(): void {

  }

  login() {
    this.Login.emit(this.auth)
  }
}
