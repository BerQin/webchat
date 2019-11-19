import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { PageService } from '@shared/services/page-data';
import { AlertService } from '@shared/services/alert.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public formgroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: Router,
    private pages: PageService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.formgroup = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  submit(e) {
    e.preventDefault();
    const val = this.formgroup.value;
    if (val.username && val.password) {
      this.api.upLoginIn({
        username: this.pages.getSignStr(val.username),
        password: this.pages.getSignStr(val.password)
      }).subscribe(res => {
        if (res.code === 1) {
          this.pages.userInfo = res.data;
          this.route.navigate(['/chat']);
        }
      });
    } else {
      this.alert.alert('请输入用户名密码');
    }
  }

}
