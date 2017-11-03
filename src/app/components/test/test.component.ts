import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { Employee } from '../../enums/employee.enum';
import { Router } from '@angular/router';
import { BooleanPipe } from '../../pipes/boolean.pipe'
declare var $: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  users: User[];
  employee: string;
  index: number;
  private router: Router;

  currencyValue: number;
  dateValue: Date;
  decimalValue: number;
  jsObject: Object;
  uppercaseValue: string;
  lowercaseValue: string;
  percentValue: number;
  sliceString: string;
  array: number[];
  strValue: string;

  blog: Object = {
    title: 'I love youe',
    content: 'You see ',
    comment: {
      content: 'I love you too ',
      like: [1, 2, 3, 4, 5]
    }
  };
  pi: number = 3.1415926;
  e: number = 8.56789718281828459045;
  p_pi: number = 0.31415926;
  p_pe: number = 0.08567897182818;
  today: number = Date.now();
  popular: boolean[] =  [false];
  constructor(router: Router) {
    this.users = [
      new User('Assassin', '617637116@qq.com', 22, 15183389255),
      new User('DH', '617637116@qq.com', 22, 15183389255),
      new User('DK', '617637116@qq.com', 22, 15183389255),
    ];
    this.employee = Employee[1];
    this.index = Employee.Manager;
    this.router = router;

    this.currencyValue = 42;
    this.dateValue = new Date('02/11/2010');
    this.decimalValue = 42.1618;
    this.jsObject = { foo: 'bar' };
    this.uppercaseValue = 'FOOBAR';
    this.lowercaseValue = 'foobar';
    this.percentValue = 42;
    this.array = [1, 2, 3];
    this.sliceString = 'abcdefghijklmnopqrstuvwxyz';
  }

  ngOnInit() {

  }
  tiaozhuan() {
    this.router.navigate['/home'];
  }
  change(value: string) {
    this.strValue = value;
  }
}
