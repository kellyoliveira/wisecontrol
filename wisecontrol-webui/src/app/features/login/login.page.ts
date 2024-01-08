import { Component, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "../../core/services/message.service";
import { AuthService } from "../../core/services/auth.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserCredential } from "../../core/view-models/userCredential";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {
 
 
  loginForm!: FormGroup;
  success: boolean = false;
  hasResult: boolean = false;
  errorMessage: string = "";
  userCredential:UserCredential = new UserCredential();
 
  constructor(
    private zone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    protected messageService: MessageService,
    private authService: AuthService
  ) { 

    
    this.success = false;
    this.hasResult = false;
    
    this.buildForm();
  }

  ngOnInit() {
    this.authService.signedUserChanged.subscribe({next: () => {
      if(this.authService.isAuthenticated) {
        this.success = true;
        this.router.navigate(['/home']);

      }
      else {
        this.messageService.isLoadingData = false;
       
        alert("Login e Senha inválidos.")

      }

    }});
    
  }

  private buildForm() {
    this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });
  }

  private validateLogin() : boolean {
    if (!this.loginForm.valid) {
      return false;
    }
    
    return true;

  }

  doLogin() {

    if (!this.validateLogin()) {
      return;
    }
  
    
    this.userCredential.email = this.loginForm.get('email')?.value;
    this.userCredential.password = this.loginForm.get('password')?.value;

    console.log(this.userCredential);

    this.signIn();
  }


  

  signIn() {



    this.errorMessage = '';
    this.messageService.blockUI();
    this.messageService.isLoadingData = true;

      

    this.authService.signin(this.userCredential).then(() => {
      
      
      
    })
    .catch(reason => {
      alert("error");
      this.success = false;
      this.messageService.isLoadingData = false;
      console.error('OAuth rejected', reason);
    });
    
  }
}
