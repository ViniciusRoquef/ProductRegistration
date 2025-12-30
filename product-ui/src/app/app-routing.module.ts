import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'produtos', pathMatch: 'full' },
  { path: 'produtos', component: ProductListComponent },
  { path: 'produtos/novo-cadastro', component: ProductFormComponent },
  { path: 'produtos/:id/edicao', component: ProductFormComponent },
  //?Fallback
  { path: '**', redirectTo: 'produtos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
