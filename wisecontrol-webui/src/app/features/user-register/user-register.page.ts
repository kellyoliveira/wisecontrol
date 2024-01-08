import { Component, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "../../core/services/message.service";
import { UserService } from "../../core/services/user.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "../../core/view-models/user";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
})
export class UserRegisterPage  {
  
  userForm!: FormGroup;
  success: boolean = false;
  hasResult: boolean = false;
  errorMessage: string = "";
  user:User = new User();

  constructor(
    private zone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    protected messageService: MessageService,
    private userService: UserService
  ) { 

    
    this.success = false;
    this.hasResult = false;
    
    this.buildForm();
  }

  ngOnInit() {
    
  }

  private buildForm() {
    this.userForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),

    });
  }

  private validateDataUser() : boolean {
    if (!this.userForm.valid) {
      return false;
    }
    
    return true;

  }

  registerUser() {
    
    if (!this.validateDataUser()) {
      return;
    }
  
    
    this.user.name = this.userForm.get('name')?.value;
    this.user.email = this.userForm.get('email')?.value;
    this.user.password = this.userForm.get('password')?.value;
    
    console.log(this.user);

    this.saveUser();
  }


  saveUser() {

    

    this.errorMessage = '';
    this.messageService.blockUI();
    this.messageService.isLoadingData = true;

    this.userService.createUser(this.user).subscribe({
      next:(r) => {
        this.messageService.isLoadingData = false;
        this.success = true;
        
        this.router.navigate(['/home']);

      },
      error:(err) => {
        alert(JSON.stringify(err));

        this.messageService.isLoadingData = false;
        this.success = false;


        this.errorMessage = err.error.message;

        alert(this.errorMessage);
      }

    });
    
  }


}
