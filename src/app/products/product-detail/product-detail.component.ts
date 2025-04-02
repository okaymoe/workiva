import { Component, type OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router";
import type { Product } from "../product.model"
import { Location } from "@angular/common";
import { ProductService } from "../product.service"
import { CommonModule } from "@angular/common";
import { ProductViewerComponent } from "../product-viewer/product-viewer.component";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
  imports: [CommonModule, ProductViewerComponent],
})
export class ProductDetailComponent implements OnInit {
  product?: Product
  loading = true

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id")
      if (id) {
        this.productService.getProductById(id).subscribe((product) => {
          if (product) {
            this.product = product
          } else {
            this.router.navigate(["/not-found"])
          }
          this.loading = false
        })
      }
    })
  }

  goBack(): void {
    this.location.back()
  }
}

