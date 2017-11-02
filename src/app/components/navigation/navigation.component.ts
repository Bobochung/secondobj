import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [AuthService]
})
export class NavigationComponent implements OnInit {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  ngOnInit() {
    $(function () {
      $('[data-url]').each(function () {
        if ($(this).data('url') == location.pathname) {
          $(this).parent().addClass('active');
        } else {
          // $(this).parent().removeClass('active');
        }
      });
    })
  }
  logOut(){
    localStorage.removeItem('username');
  }

}
