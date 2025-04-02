import { Component, type OnInit } from "@angular/core"
import { Product } from "../product.model"
import { ProductService } from "../product.service"
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from "@angular/forms"
import { debounceTime, distinctUntilChanged } from "rxjs/operators"
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: "app-product-list",
  standalone: true,
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
  imports: [CommonModule, ReactiveFormsModule, ProductCardComponent],
})
export class ProductListComponent implements OnInit {
  products: Product[] = []
  filteredProducts: Product[] = []
  searchControl = new FormControl("")
  sortControl = new FormControl("featured")

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products
      this.applyFilters()
    })

    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(() => {
      this.applyFilters()
    })

    this.sortControl.valueChanges.subscribe(() => {
      this.applyFilters()
    })
  }

  applyFilters(): void {
    const searchTerm = this.searchControl.value?.toLowerCase() || ""

    //filter products
    this.filteredProducts = this.products.filter((product) => product.name.toLowerCase().includes(searchTerm))

    // sort products
    const sortBy = this.sortControl.value || "featured"
    this.filteredProducts = [...this.filteredProducts].sort((a, b) => {
      if (sortBy === "price-low") {
        return a.price - b.price
      } else if (sortBy === "price-high") {
        return b.price - a.price
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      }
      return 0
    })
  }

  handleViewDetails(productId: string): void {}
}

