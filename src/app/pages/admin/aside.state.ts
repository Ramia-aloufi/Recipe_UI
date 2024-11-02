import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class asideState {
    private selected = new BehaviorSubject<string>("Dashboard");


    select(item:string){
        this.selected.next(item)
    }
    getItem():string{
       return this.selected.getValue()
    }

  }