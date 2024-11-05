import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthManager } from '../../states/auth.state';
import { RecipeManager } from '../../states/recipe.state';
import { Subscription } from 'rxjs';
import { RecipeFormComponent } from '../../components/recipe-form/recipe-form.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule,RecipeFormComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit{
  userData$ = this.auth.getState();
  showSearch: boolean = false;
  isSidebarOpen = false;
  isFormOpen = false;
  isSmallScreen = window.innerWidth <= 768;

  constructor(
    private auth: AuthManager,
    private recipeState: RecipeManager,
    private router: Router
  ) {}
  ngOnInit() {
    var routeSubscription: Subscription;
    routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSearch = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '/home';
      }
    });
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  toggleNewRecipe() {
    console.log("Clicked");
    
    this.isFormOpen = !this.isFormOpen;
  }
  onSearch(searchKey: Event) {
    const target = searchKey.target as HTMLInputElement;
    if (target) {
      this.recipeState.search(target.value);
    }
  }
  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 768;
  }

}
