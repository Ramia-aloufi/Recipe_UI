import { Component } from '@angular/core';
import { UserManager } from '../../../states/user.state';
import { CommonModule } from '@angular/common';
import { AsideComponent } from "../aside/aside.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, AsideComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  usersState$ = this.state.getState()

  constructor(private state:UserManager){
    this.state.loadUsers()
    this.usersState$.subscribe(aa=>{
      console.log(aa.data);
      
    })
  }

}
