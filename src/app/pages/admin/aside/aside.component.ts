import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { asideState } from '../aside.state';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  selected = this.state.getItem()
  constructor(private state:asideState){

  }
  isSelected(select:string){
    this.state.select(select)
  }
}
