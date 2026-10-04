import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {

   private baseUrl = "https://ai-auto-email-reply-generator.onrender.com/api/email";


  constructor(private http : HttpClient){}

  generateReply( email : string) {

    const emailStructure = {
      mailContent : email ,
      tone : ""
    }
   return  this.http.post(this.baseUrl 
                         ,emailStructure , 
                        {responseType : 'text'}) ; 
  }
}
