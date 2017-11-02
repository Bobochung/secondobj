import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
declare var $: any;

@Component({
  selector: 'app-cms-list',
  templateUrl: './cms-list.component.html',
  styleUrls: ['./cms-list.component.css']
})
export class CmsListComponent implements OnInit {

  private http: Http;
  constructor(http: Http) {
    this.http = http;
  }

  makeGetUserList() {
    let url = 'http://127.0.0.1:3009/api/get-cms-list';
    this.http.get(url)
      .subscribe((res: Response) => {
        let resData = res.json();
        if (parseInt(resData.code) == 1) {
          let _cmsSet = this.getCmsArr(resData.cms, 'resData.role');
          this.renderTable(_cmsSet, 'resData.role');
        }
      });
  }
  getCmsArr(cmsSet, role) {
    var _cmsArr = cmsSet;
    var jsoncount = _cmsArr.length;
    var cmsData = new Array();

    for (var i = 0; i < jsoncount; i++) {
      var _arr = new Array();
      _arr[0] = '<input type="checkbox">';
      _arr[1] = _cmsArr[i].classTitle;
      _arr[2] = _cmsArr[i].title;
      _arr[3] = _cmsArr[i].content;
      _arr[4] = _cmsArr[i].author
      if (parseInt(_cmsArr[i].isPublish) == 1) {
        _arr[5] = "是";
      }
      if (parseInt(_cmsArr[i].isPublish) == 0) {
        _arr[5] = "否";
      }
      _arr[6] = _cmsArr[i].url;
      _arr[7] = _cmsArr[i].createdAt;
      _arr[8] = `<button class="btn btn-default btn-sm"      
                          data-toggle="modal" 
                            id="edit"
                            data-target="#editModal" 
                            (click)="edit(${_cmsArr[i]._id}, this)">
                        <span class="glyphicon glyphicon-pencil"></span>
                    </button>
                    <button class="btn btn-danger btn-sm" 
                            data-toggle="modal"
                            id="delete" 
                            data-target="#deleteModal" 
                            (click)="edit(${_cmsArr[i]._id}, this)">
                        <span class="glyphicon glyphicon-trash"></span>
                    </button>`;
      if (!role) {
        _arr.pop();
        _arr.shift();
      }
      cmsData[i] = _arr;
    }
    return cmsData;
  };

  renderTable(cmsSet, role) {
    var columns = [
      { title: '<input type="checkbox">', orderable: false },
      { title: "分类" },
      { title: "类别" },
      { title: "内容" },
      { title: "作者" },
      { title: "发布" },
      { title: "链接" },
      { title: '创建时间' },
      { title: "操作", orderable: false }
    ];
    if (!role) {
      columns.pop();
      columns.shift();
    }
    $('#example-cms').DataTable({
      data: cmsSet,
      columns: columns
    });
  }

  //表格中按钮事件
  edit(id, indet) {
    console.log($(indet).attr('id'));
    if ($(indet).attr('id') === 'edit') {
      $.ajax({
        url: '/cms/show-items/' + id,
        type: 'GET',
        async: true,
        data: "",
        success: function (res) {
          //将数据渲染到界面上                  
          $('#classTitle').val(res.item[0].classTitle);
          $('#title').val(res.item[0].title);
          $('#content').val(res.item[0].content);
          $('#author').val(res.item[0].author);
          if (parseInt(res.item[0].isPublish) === 1) {
            $('#publishY').attr('checked', 'checked');
          } else if (parseInt(res.item[0].isPublish) === 0) {
            $('#publishN').attr('checked', 'checked');
          }
          $('#url').val(res.item[0].url);
          $('#updata').on('click', this.saveItems);
        }
      });
    } else {
      $('#btn-delete').on('click', this.deleteItems);
    }
  }
  //模态框按钮事件
  //保存修改
  saveItems() {
    var param = $('#edit-form').serialize();
    $.ajax({
      url: '/cms/save-profile',
      type: 'POST',
      async: true,
      data: param,
      success: function (res) {
        console.log(res)
        if (parseInt(res.code) == 0) {
          alert(res.msg);
        } else {
          window.location.href = res.url;
        }
      }
    });
  }
  //确定删除
  deleteItems() {
    $.ajax({
      url: '/cms/delete-profile/' + $('#_id').val(),
      type: 'GET',
      async: true,
      data: '',
      success: function (res) {
        console.log(res);
        if (parseInt(res.code) == 0) {
          alert(res.msg);
        } else {
          window.location.href = res.url;
        }
      }
    });
  }
  //添加数据
  addItems() {
    var param = $('#edit-form').serialize();
    $.ajax({
      url: '/cms/addItems-profile',
      type: 'POST',
      async: true,
      data: param,
      success: function (res) {
        if (parseInt(res.code) == 0) {
          alert(res.msg);
        } else {
          window.location.href = res.url;
        }
      }
    });
  }


  ngOnInit() {
    this.makeGetUserList();
  }

}
