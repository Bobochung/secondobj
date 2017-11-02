import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.css']
})
export class BackToTopComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(window).scroll(function () {
      $('.top').show();
      if ($(window).scrollTop() <= 100) {
        $('.top').hide();
      }
    });
    $('.top').on('click', function () {
      $(window).scrollTop(0);
    });
  }

}
