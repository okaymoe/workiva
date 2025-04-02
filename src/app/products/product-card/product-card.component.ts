import { Component, Input, Output, EventEmitter } from "@angular/core"
import type { Product } from "../product.model"
import { Router } from "@angular/router"
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
  imports: [CommonModule],
})
export class ProductCardComponent {
  @Input() product!: Product
  @Output() viewDetails = new EventEmitter<string>()

  constructor(private router: Router) {}

  onViewDetails(): void {
    this.router.navigate(["/products", this.product.id])
  }
}

