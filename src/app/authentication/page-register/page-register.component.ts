import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRepoService } from '@app/shared/reposervice/user.repo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.css']
})
export class PageRegisterComponent implements OnInit {
  public user: any = { displayName: '', email: '', password: '', confirmPassword: '' };
  public erros: any[] = [];
  constructor(private router: Router, private userSrv: UserRepoService, private toastr: ToastrService) { }

  ngOnInit() { }

  onSubmit(registrationForm: any) {
    if (registrationForm.value.password === registrationForm.value.confirmPassword) {
      this.userSrv.saveUserInfo(registrationForm.value).subscribe((el) => {
        this.toastr.info('Please try to login.', 'Registered sucessfully', {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        this.router.navigate(['/authentication/page-login']);
      });
    } else{
      this.erros.push({
        type:'danger',
        message:'Password does not match.',
        icon:'fa-info-circle',
        showClose:true
      });
    }
  }
}
