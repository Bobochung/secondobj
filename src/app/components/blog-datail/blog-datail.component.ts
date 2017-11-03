import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-blog-datail',
  templateUrl: './blog-datail.component.html',
  styleUrls: ['./blog-datail.component.css']
})
export class BlogDatailComponent implements OnInit {
  id: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.params.subscribe(params => { this.id = params['id'] });
    console.log(this.id);
  }
  ngOnInit() {
  }

}
