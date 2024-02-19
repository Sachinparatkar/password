import { Component } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Task } from './task';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
title = 'PASSWORD';

url:String='http://localhost:8080/';
  username: String;
  password: String;
  securityCode: String;
  user: User;
  details: String;
log:number=0;
anu:number=0;
constructor(private http:HttpClient)
{}
LogIn()
{
    this.http.get(this.url+'login'+this.username+'and'+this.password).subscribe(
      (data:any)=>{
        if(data==null){
               window.alert("Invalid Username/Password.Try Again !!");
        }
        else{
          this.log=1;
          this.username="";
          this.password="";
          this.user=data;
        }
      }
    );
    }
  
  logout()
  {
    this.log=0;
    this.username="";
    this.password="";
    this.securityCode="";
      
  }
  j:Number=1;
  newpassword: String;
  confirmpassword: String;
  Submit()
  {
    this.j=1;
  }
  sQode: String;
  ForgetPassword()
  {
    this.j=0;
  }
  backtologin()
  {
      this.j=1;
  }
  
  isCode:boolean=false;

  checkCode()
  {
    this.http.get(this.url+"checkCode"+this.username+"and"+this.sQode).subscribe(
        (data:any)=>
        {
          if(data)
          {
            this.isCode=true;
            this.j=1;
            this.log=4;
               window.alert("Code Matched!!");
               this.changepsassword();
          }
          else
          window.alert("Invalid Username/Security Code, Please Check!!");
        }
      )

    }
    ConfirmPass: String;
    changepsassword(){
      if(this.ConfirmPass!=this.password)
      {
        window.alert("Changed Password!!");
      }
      else
      {
       this.http.get(this.url+'changepassword'+this.username+'and'+this.ConfirmPass).subscribe(
        (data:any)=>{
            if(data)
            {
              this.isCode=false;
              this.log=0;
              window.alert("Password changed Successfully !!, Please LogIn.");
            }
            else
            window.alert("Invalid Password,Please Check !!");
        }
      );

    }
  }
add()
{ 
  this.http.get(this.url+'add'+this.user.id+'and'+this.details).subscribe
  (
    (data:any)=>
    {
      if(data==null)
      {
        window.alert("Something Went Wrong");
      }
      else{
        this.user.task.push(data);
        this.details='';
      }
    }

  );

}
  Delete(tasks:Task)
  {
  this.http.get(this.url+'delete'+this.user.id+'and'+tasks.id).subscribe(
  (data:any)=>{
    if(data)
    {
      let index=this.user.task.indexOf(tasks);
      this.user.task.splice(index,1);
    } 
   }
  ); 
}
  name: String;
  userName: String;
  userPassword: String;
submit()
{
  this.anu=1;
}
AfterSubmit()
{
  this.anu=0;
}
register()
{

  this.http.get(this.url+'register'+this.name+'and'+this.userName+'and'+this.userPassword+'and'+this.securityCode).subscribe(
  (data:any)=>
  {
      if(data)
      {
        window.alert("Successfully Register");
        this.name="";
        this.userName="";
        this.userPassword="";
        this.securityCode="";
      }
      else
      {
        window.alert("Please Fill Correct Information");
      }
  }
 );
}
changeStatus(task:Task, newStatus:number){
this.http.get(this.url+'changeStatus'+task.id+'and'+newStatus).subscribe(
(data:any)=>{
  if(data)
  {
    window.alert("Something Went Wrong");
  }
  else
  {
     task.status=newStatus;
  }
}
);
}
}
