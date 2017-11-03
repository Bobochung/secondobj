import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
declare var $: any;

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
  providers: [AuthService]
})
export class UploadFileComponent implements OnInit {

  files: FileList;
  response: Observable<any>;
  message: string;
  para: string;
  year: number;
  month: number;
  timestr: number;
  imgsrc: string;
  constructor(private authService: AuthService,
    private http: Http) {
    var now = new Date();
    this.year = now.getFullYear();
    this.month = now.getMonth();
    this.timestr = Date.now();

  }

  getFiles(event) {
    this.files = event.target.files; //当input的值发生变化时,将变化的值取出
  }

  submitFile() {
    this.para = `/upload-profile/${this.authService.getUser()}/${this.year}/${this.month}/${this.timestr}`;
    this.makePostUpload(this.files, this.para);
  }

  makeGet() {
    let url = `${this.authService.apiUrl}/profile/${this.authService.getUser()}`;
    this.http.get(url).subscribe((res: Response) => {
      let resData = res.json().users;
      this.imgsrc = this.authService.remotUrl + resData[0].picture;
    });
  }

  makePostUpload(fileList, url: string) {
    let file: File = fileList[0];
    if (fileList.length > 0) {
      let headers: Headers = new Headers();
      headers.append("enctype", "multipart/form-data");
      let options: RequestOptions = new RequestOptions();
      options.headers = headers;
      options.method = 'POST';
      let formData: FormData = new FormData();// 实例化表单对象
      formData.append('photoFile', file, file.name);// 组装表单数据
      console.log(this.authService.apiUrl + url);
      this.http.post(this.authService.apiUrl + url, formData, options)
        .subscribe((res: Response) => {
          this.imgsrc = this.authService.remotUrl + res.json().imgpath;
        });
    }
  }

  ngOnInit() {
    /* 上传文件框初始化 */
    $(function () {
      $('#file').fileinput({
        language: 'zh',
        showUpload: true,
      });
    });
    this.makeGet();
  }

}
