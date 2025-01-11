import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { asideState } from '../aside.state';

@Component({
    selector: 'app-aside',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './aside.component.html',
    styleUrl: './aside.component.css'
})
export class AsideComponent  {
  selected = this.state.getItem()
  constructor(private state:asideState,private route:ActivatedRoute){

  }
  isSelected(select:string){
    this.state.select(select)
  }

}
