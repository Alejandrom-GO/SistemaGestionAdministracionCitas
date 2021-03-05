import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../user/services/users.service';

@Component({
  selector: 'app-form-cita',
  templateUrl: './form-cita.component.html',
  styleUrls: ['./form-cita.component.css']
})
export class FormCitaComponent implements OnInit {

  @Input() res: any = [];

 

  ngOnInit(): void {
    console.log(this.res);
  }

}
