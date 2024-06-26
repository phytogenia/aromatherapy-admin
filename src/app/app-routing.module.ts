import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {SigninComponent} from './auth/signin.component';
import {OilsCrudLayoutComponent} from './components/oils-layout/oils-crud-layout.component';
import {StatsLayoutComponent} from './components/stats-layout/stats-layout.component';
import {RecipesCrudLayoutComponent} from "./components/recipes-layout/recipes-crud-layout.component";
import {
  RecipesDetailLayoutComponent
} from "./components/recipes-layout/recipes-detail-layout/recipes-detail-layout.component";
import {OilsDetailLayoutComponent} from "./components/oils-layout/oils-detail-layout/oils-detail-layout.component";
import {MobileLayoutComponent} from "./components/mobile-layout/mobile-layout.component";
import {TermOfUseComponent} from "./components/static-pages/term-of-use/term-of-use.component";
import {PrivacyPolicyComponent} from "./components/static-pages/privacy-policy/privacy-policy.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'stats', //TODO :: stats
  },
  {
    path: 'stats',
    canActivate: [AuthGuard],
    component: StatsLayoutComponent,
  },
  {
    path: 'oils',
    canActivate: [AuthGuard],
    component: OilsCrudLayoutComponent,
    children: [
      {path: 'edit/:id', component: OilsDetailLayoutComponent, pathMatch: 'full',},
      {path: 'new', component: OilsDetailLayoutComponent, pathMatch: 'full',},
    ]
  },
  //TODO:: oilID path
  {
    path: 'recipes',
    canActivate: [AuthGuard],
    component: RecipesCrudLayoutComponent,
    children: [
      {path: 'edit/:id', component: RecipesDetailLayoutComponent, pathMatch: 'full',},
      {path: 'new', component: RecipesDetailLayoutComponent, pathMatch: 'full',},
    ]
  },
  {
    path: 'mobile-layout',
    component: MobileLayoutComponent,
  },
  {
    path: 'auth',
    component: SigninComponent,
  },
  {
    path: 'terms-of-use',
    component: TermOfUseComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },




  { path: '**', redirectTo: '/auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
