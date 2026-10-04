import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {

  private baseUrl = "http://localhost:8080/api/email" ;


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
