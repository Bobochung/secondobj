import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';//模板驱动型表单
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AuthService } from '../../services/auth.service';
declare var $: any;
declare var validator: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AuthService]
})
export class ProfileComponent implements OnInit {
  signUpForm: FormGroup;
  pictureUrl: string;
  profileForm: FormGroup;
  isFemale: string;
  isMale: string;
  gender: any = 1;
  private fb: FormBuilder;
  private authService: AuthService;
  private http: Http;
  constructor(fb: FormBuilder, authService: AuthService, http: Http) {
    this.isFemale = '';
    this.isMale = '';
    this.fb = fb;
    this.authService = authService;
    this.http = http;
  }

  ngOnInit() {
    this.makeGet();
  }
  makeGet() {
    let url = `${this.authService.apiUrl}/profile/${this.authService.getUser()}`;
    this.http.get(url).subscribe((res: Response) => {
      if (parseInt(res.json().code) == 1) {
        let resData = res.json().users;
        this.profileForm = this.fb.group({
          'realName': [resData[0].realName, Validators.required],
          'nickName': [resData[0].nickName, Validators.compose([Validators.minLength(4), Validators.maxLength(16), Validators.required])],
          'phone': [resData[0].phone, Validators.required],
          'age': [resData[0].age, Validators.required],
          'gender': [resData[0].gender, Validators.required],
          'email': [this.doShowEmail(resData[0].email, resData[0].phone), Validators.compose([Validators.required, this.emailValidator])],
          'address': [resData[0].address, Validators.required],
        });
        this.pictureUrl = `${this.authService.remotUrl}/${resData[0].picture}`;
        this.doShowGender(resData[0].gender);
      }
      if (parseInt(res.json().code) == 0) {

      }

    });
  }
  //自定义验证器emailValidator
  emailValidator(control: FormControl): { [s: string]: boolean } {
    if (!validator.isEmail(control.value)) {
      return { invalidEmail: false };
    }
  }
  doShowEmail(str: string, phone: string): string {
    let arr = str.split('@');
    let ret = str;
    if (arr[0] === phone && arr[1] === 'api.com') {
      ret = '';
    }
    return ret;
  }
  doShowGender(str: any) {
    if (parseInt(str) === 1) {
      this.isMale = 'checked';
    }
    if (parseInt(str) === 0) {
      this.isFemale = 'checked';
    }
  }
  getGender(val) {
    this.gender = val;
  }
  doSubmit(data: any) {
    let { realName, nickName, phone, email, age, gender, address } = data;
    let strData = `realName=${realName}&nickName=${nickName}&phone=${phone}&email=${email}&age=${age}&gender=${this.gender}&address=${address}`;
    this.makePost(strData);
  }
  makePost(strData: string): void {
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options: RequestOptions = new RequestOptions();
    options.headers = headers;
    options.method = 'POST';
    this.http.post(this.authService.apiUrl + '/save-user-profile', strData, options)
      .subscribe((res: Response) => {
        switch (res.json().code) {
          case 'ERROR': {
            alert(res.json().msg);
            break;
          }
          case 'SUCCESS': {
            alert(res.json().msg);
            break;
          }
        }
      });
  }
}
