import { Injectable } from "@angular/core";
import { StateService } from "../services/state.service";
import { CommentService } from "../services/comment.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { RecipeManager } from "./recipe.state";
import { IComment } from "../models/comment.model";
@Injectable({
    providedIn: 'root',
  })
  export class CommentManager extends StateService<IComment> {

  
    constructor(private service:CommentService,private toaster:ToastrService,private recipe:RecipeManager) {
      super();
    }
    add(data:{text:string,recipe:string}){
        this.setLoading(true)
        this.service.newComment(data).subscribe({
            next:res=>{   
                console.log(res.data);
                             
                this.setData(res.data)
                this.toaster.success(res.message as string)                
                 this.recipe.getRecipe(data.recipe);
                
                        },
            error:(er:HttpErrorResponse)=>{
                this.toaster.error(er.error.message)
                this.setError(er.error.message)
            }
        })
    }
    remove(comment:IComment){
        this.setLoading(true)
        this.service.removeComment(comment._id).subscribe({
            next:res=>{
                console.log(res.data);
                this.setData(res.data)
                this.recipe.getRecipe(comment.recipe)
                this.toaster.success(res.message as string)
            },
            error:(er:HttpErrorResponse)=>{
                this.toaster.error(er.error.message)
                this.setError(er.error.message)
            }
        })
    }
}