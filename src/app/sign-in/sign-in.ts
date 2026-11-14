import { Component, signal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  imports: [UpperCasePipe],
  selector: 'app-sign-in',
  styleUrl: './sign-in.css',
  templateUrl: './sign-in.html',
})

export class SignIn {
  signedInName = signal('');
  router = inject(Router)

  signIn(name: string) {
    this.signedInName.set(name);
  }

  toEnrollments(){
    this.router.navigate(['/myEnrolments'])
  }
}
