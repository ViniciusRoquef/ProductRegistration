import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from 'src/app/models/interface/product.interface';
import { ProductService } from 'src/app/models/service/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  id?: string;
  loading = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    price: [0],
    description: [''],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? undefined;

    if (this.id) {
      this.loadProduct(this.id);
    }
  }

  private loadProduct(id: string): void {
    this.loading = true;
    this.productService.getListById(id).subscribe({
      next: (product) => {
        this.form.patchValue({
          name: product.name ?? '',
          price: product.price ?? 0,
          description: product.description ?? '',
        });
      },
      error: (err) => console.error(err),
      complete: () => (this.loading = false),
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Product = {
      id: this.id,
      ...(this.form.value as any),
    };

    this.loading = true;

    const req$ = this.id
      ? this.productService.update(payload)  // PUT
      : this.productService.create(payload); // POST

    req$.subscribe({
      next: () => {
        this.router.navigate(['/produtos'], { queryParams: { refresh: Date.now() } });
      },
      error: (err) => console.error(err),
      complete: () => (this.loading = false),
    });
  }

  cancel(): void {
    this.router.navigate(['/produtos']);
  }
}
