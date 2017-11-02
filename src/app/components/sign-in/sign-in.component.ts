import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AuthService } from '../../services/auth.service';
declare var $: any;
declare var validator: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [AuthService]
})
export class SignInComponent implements OnInit {
  private authService: AuthService;
  private http: Http;
  captcha: string;
  invalidPhone: boolean;
  invalidPass: boolean;
  invalidRePass: boolean;
  invalidCaptcha: boolean;
  constructor(authService: AuthService, http: Http) {
    this.authService = authService;
    this.http = http;
    this.captcha = authService.captchaUrl;
  }

  ngOnInit() {
  }
  getCaptcha() {
    this.captcha = this.authService.getCaptcha();
  }
  doSubmit(formData: any, obj: any) {
    let { phone, password, repassword, captcha } = formData;
    let strData = `phone=${phone}&password=${password}&repassword=${repassword}&captcha=${captcha}`;
    // this.makePost(strData, obj);
    this.doValidatorFormCaptcha(formData);
    this.doValidatorFormPassword(formData);
    this.doValidatorFormRePass(formData);
    this.doValidatorFormCaptcha(formData);
  }
  makePost(strData: string, obj: any): void {
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options: RequestOptions = new RequestOptions();
    options.headers = headers;
    options.method = 'POST';
    this.http.post(this.authService.apiUrl + '/sign-in', strData, options)
      .subscribe((res: Response) => {
        switch (res.json().code) {
          case 'PHONE_FORMAT_ERR': {
            alert(res.json().msg);
            break;
          }
          case 'CAPTCHA_ERR': {
            alert(res.json().msg);
            break;
          }
          case 'PAW_LENGTH_ERR': {
            alert(res.json().msg);
            break;
          }
          case 'REPAW_NOT_MATCH': {
            alert(res.json().msg);
            break;
          }
          case 'REQ_THROW': {
            alert(res.json().msg);
            break;
          }
          case 'REQ_SUCCESS': {
            localStorage.setItem('username', res.json().userName);
            obj.click();
            break;
          }
        }
      });
  }
  // 电话号码验证
  doValidatorFormPhone(formData: any) {
    if (!validator.isMobilePhone(formData.phone, 'zh-CN')) {
      this.invalidPhone = true;
      return false;
    }
    else {
      this.invalidPhone = false;
    }
  }
  // 密码验证
  doValidatorFormPassword(formData: any) {
    if (!validator.isLength(formData.password, {
      min: 6,
      max: 20
    })) {
      this.invalidPass = true;
      return false;
    }
    else {
      this.invalidPass = false;
    }
  }
  // 确认密码验证
  doValidatorFormRePass(formData: any) {
    if (formData.password !== formData.repassword) {
      this.invalidRePass = true;
      return false;
    }
    else {
      this.invalidRePass = false;
    }
  }
  // 验证码验证
  doValidatorFormCaptcha(formData: any) {
    if (formData.captcha != 4) {
      this.invalidCaptcha = true;
      return false;
    }
    else {
      this.invalidCaptcha = false;
    }
  }
  // 关闭模态框后还原状态
  clearState() {
    this.invalidCaptcha = this.invalidPass = this.invalidPhone = this.invalidRePass = false;
  }
}
