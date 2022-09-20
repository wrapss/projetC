import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/http-service.service';
import {Credentials} from "../../_interfaces/credentials";
import {TokenService} from "../../_services/token.service";

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent  {
  form: Credentials = {
    email: '',
    password: ''
  }
  alerte = false
  constructor(
    private httpService: HttpServiceService,
    private tokenService: TokenService,
    private dialogRef : MatDialog) {
  }
  close(){
    this.dialogRef.closeAll();
  }
  onSubmit(): void{
    console.log(this.form.email)
    this.httpService.login({identified: this.form}).subscribe(
      data => {
        // @ts-ignore
        this.tokenService.saveToken(data.headers.get('Authorization'))
        this.dialogRef.closeAll();
      },
      err => {
        this.alerte = true
      }
    )
  }
}
