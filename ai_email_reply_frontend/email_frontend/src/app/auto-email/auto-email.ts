import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../email-service';

@Component({
  selector: 'app-auto-email',
  imports: [FormsModule , CommonModule],
  templateUrl: './auto-email.html',
  styleUrl: './auto-email.css',
})
export class AutoEmail {

    content : string = "" ;
    ans : string = "" ; 

  constructor(private cd : ChangeDetectorRef , private emailService : EmailService){}

   generateReply(email :string){
     this.emailService.generateReply(email).subscribe((result)=>{
      this.ans = result ; 
       this.cd.detectChanges() ;
    });
    
  }


}
