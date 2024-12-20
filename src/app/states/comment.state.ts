import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Category } from "../models/category.model";
import { CategoryService } from "../services/category.service";
import { StateService } from "../services/state.service";
import { CommentService } from "../services/comment.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { RecipeManager } from "./recipe.state";

@Injectable({
    providedIn: 'root',
  })
  export class CommentManager extends StateService<Comment> {

  
    constructor(private service:CommentService,private toaster:ToastrService,private recipe:RecipeManager) {
      super();
    }
    add(data:{text:string,recipe:string}){
        this.setLoading(true)
        this.service.newComment(data).subscribe({
            next:res=>{                
                this.setData(res.data)
                this.recipe.getRecipe(this.recipe.recipeID$.getValue())
            },
            error:(er:HttpErrorResponse)=>{
                this.toaster.error(er.error.message)
                this.setError(er.error.message)
            }
        })
    }
    remove(id:string){
        this.setLoading(true)
        this.service.removeComment(id).subscribe({
            next:res=>{
                this.setData(res.data)
                this.recipe.getRecipe(this.recipe.recipeID$.getValue())
            },
            error:(er:HttpErrorResponse)=>{
                this.toaster.error(er.error.message)
                this.setError(er.error.message)
            }
        })
    }
}