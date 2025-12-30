import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from 'src/app/models/interface/product.interface';
import { ProductService } from 'src/app/models/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = false;

  searchForm = this.fb.group({
    name: [''],
  });

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(() => {
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getList().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => console.error(err),
      complete: () => (this.loading = false),
    });
  }

  newProduct(): void {
    this.router.navigate(['/produtos/novo-cadastro']);
  }

  editProduct(product: Product): void {
    if (!product.id) return;
    this.router.navigate(['/produtos', product.id, 'edicao']);
  }

  removeProduct(product: Product): void {
    if (!product.id) return;

    const remove= confirm(`Remover "${product.name}"?`);
    if (!remove) return;

    this.loading = true;
    this.productService.delete(product.id).subscribe({
      next: () => {
        next: () => {
          this.products = this.products.filter(p => p.id !== product.id);
          this.loadProducts();
        }
      },
      error: (err) => console.error(err),
      complete: () => (this.loading = false),
    });
  }
}
