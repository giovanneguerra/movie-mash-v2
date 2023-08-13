import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = inject(AngularFireAuth);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  isLoading$ = new Subject<boolean>();

  initForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(isSignup: boolean, authForm: FormGroup) {
    this.isLoading$.next(true);

    const email = authForm.value.email;
    const password = authForm.value.password;

    if (isSignup) {
      return this.auth.createUserWithEmailAndPassword(email, password).then(() => {
        this.router.navigate(['/']);
        this.isLoading$.next(false);
      })
      .catch((error) => {
        console.error('Login error:', error);
        return [];
      });;
    } else {
      return this.auth.signInWithEmailAndPassword(email, password).then(() => {
        this.router.navigate(['/']);
        this.isLoading$.next(false);
      })
      .catch((error) => {
        console.error('Register error:', error);
        return [];
      });;
    }
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.auth.authState.pipe(
      map(user => !!user),
    );
  }
}
