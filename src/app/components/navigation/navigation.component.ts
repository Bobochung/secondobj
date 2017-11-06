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
      $('#nav').find('li').each(function () {
        $(this).on('click', function () {
          $('#nav>li.active').removeClass('active');
          $(this).addClass('active');
        })
      })
    })
  }
  logOut() {
    localStorage.removeItem('username');
  }

}
