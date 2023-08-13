import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'moma-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy{
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  isSignup = false;
  isLoading = false;
  authForm: FormGroup;
  private loadingSubscription: Subscription;

  ngOnInit() {
    this.authForm = this.authService.initForm();
    this.loadingSubscription = this.authService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    this.isSignup = this.route.snapshot.routeConfig.path === 'sign-up';
    this.authForm = this.authService.initForm();
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.authService.onSubmit(this.isSignup, this.authForm);
    }
  }

  toggleForm() {
    this.isSignup = !this.isSignup;
    this.authForm = this.authService.initForm();
  }

}
