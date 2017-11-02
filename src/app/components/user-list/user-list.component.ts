import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
declare var $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private http: Http;
  constructor(http: Http) {
    this.http = http;
  }

  ngOnInit() {
    this.makeGetUserList();
  }

  makeGetUserList() {
    let url = 'http://127.0.0.1:3009/api/get-users-list';
    this.http.get(url)
      .subscribe((res: Response) => {
        let resData = res.json();
        if (parseInt(resData.code) == 1) {
          let _userSet = this.getUserArr(resData.users, 'resData.role');
          this.renderTable(_userSet, 'resData.role');
        }
      });
  }
  //构造取得的数据
  getUserArr(userSet, role) {
    var _userArr = userSet;
    var jsoncount = _userArr.length;
    var userData = new Array();

    for (var i = 0; i < jsoncount; i++) {
      var _arr = new Array();
      _arr[0] = '<input type="checkbox">'
      _arr[1] = _userArr[i].realName;
      _arr[2] = _userArr[i].nickName;
      _arr[3] = _userArr[i].picture;
      _arr[4] = _userArr[i].phone + "@163.com";
      if (parseInt(_userArr[i].gender) == 1) {
        _arr[5] = "男";
      }
      if (parseInt(_userArr[i].gender) == 0) {
        _arr[5] = "女";
      }
      _arr[6] = _userArr[i].phone;
      _arr[7] = _userArr[i].age;
      _arr[8] = _userArr[i].address;
      _arr[9] = `<button class="btn btn-default btn-sm"
                        id="edit" 
                        data-toggle="modal" 
                        data-target="#editModal" 
                        onclick="edit(${_userArr[i]._id}, this)">
			            <span class="glyphicon glyphicon-pencil"></span>
		            </button>
                <button class="btn btn-danger btn-sm" 
                        data-toggle="modal"
                        id="delete" 
                        data-target="#deleteModal" 
                        onclick="edit(${_userArr[i]._id}, this)">
		              <span class="glyphicon glyphicon-trash"></span> \
	              </button>`;
      if (!role) {
        _arr.pop();
        _arr.shift();
      }
      userData[i] = _arr;
    }
    return userData;
  };
  //渲染数据
  renderTable(userSet, role) {
    var columns = [
      { title: '<input type="checkbox">', orderable: false },
      { title: "realname" },
      { title: "nicname" },
      { title: "picture" },
      { title: "loginname" },
      { title: "gender" },
      { title: "phone" },
      { title: "age" },
      { title: 'address' },
      { title: "操作", orderable: false }
    ];
    if (!role) {
      columns.pop();
      columns.shift();
    }
    $('#example-user').DataTable({
      data: userSet,
      columns: columns
    });
  };

}
