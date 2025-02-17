import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  errorMsg?: string;
  requestOnGoing: boolean = false;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  async onSubmitLogin(): Promise<void> {
    if (this.form.invalid) return;

    const { email, password, remember } = this.form.value;
    this.errorMsg = undefined;
    this.requestOnGoing = true;

    try {
      await this.authService.login(email, password, remember);
      this.router.navigateByUrl('/produits');
    }
    catch (e: any) {
      if (e.status === 401) this.errorMsg = 'Email ou mot de passe incorrect';
      else this.errorMsg = 'Une erreur est survenue, veuillez réessayer plus tard';
    }
    this.requestOnGoing = false;
  }

  private initForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      remember: new FormControl(false)
    });
  }
}
