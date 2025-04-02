import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'iPhone 16 Pro',
      price: 1299,
      description: 'Latest Apple iPhone with VisionOS',
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S25',
      price: 1199,
      description: 'Top Android flagship of the year',
      image: 'https://images.samsung.com/is/image/samsung/assets/global/galaxy-s24-ultra-overview.jpg'
    },
    {
      id: 3,
      name: 'Google Pixel 9',
      price: 999,
      description: 'AI-powered phone with excellent camera',
      image: 'https://store.google.com/product/images/pixel_9_mock_image.jpg'
    }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }
}
