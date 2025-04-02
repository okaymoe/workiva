import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: "iphone-16-pro",
      name: "iPhone 16 Pro",
      price: 999,
      description: "The ultimate iPhone experience with Dynamic Island, a 48MP camera for breathtaking detail, and the Always-On display.",
      image: "assets/phone-images/iphone16.jpg",
      isNew: true,
      features: [
        "A16 Bionic chip",
        "48MP main camera with quad-pixel sensor",
        "Dynamic Island",
        "Always-On display",
        "Emergency SOS via satellite"
      ]
    },
    {
      id: "samsung-galaxy-s25",
      name: "Samsung Galaxy S25 Ultra",
      price: 1199,
      description: "Experience epic with the 200MP camera, built-in S Pen, and the powerful Snapdragon 8 Gen 2 processor.",
      image: "assets/phone-images/galaxy.jpg",
      features: [
        "200MP main camera",
        "Built-in S Pen",
        "Snapdragon 8 Gen 2 processor",
        "5000mAh battery",
        "45W super-fast charging"
      ]
    },
    {
      id: "google-pixel-9",
      name: "Google Pixel 9 Pro",
      price: 899,
      description: "Google's best-of-everything phone with the most advanced Pixel camera and the powerful Google Tensor G2 chip.",
      image: "assets/phone-images/pixel.jpg",
      features: [
        "Google Tensor G2 chip",
        "Macro Focus",
        "30x Super Res Zoom",
        "Adaptive Battery",
        "Face Unblur"
      ]
    },
    {
      id: "oneplus-13",
      name: "OnePlus 13",
      price: 699,
      description: "Flagship killer with Hasselblad camera system, 100W SUPERVOOC charging, and the Snapdragon 8 Gen 2 processor.",
      image: "assets/phone-images/1plus.jpg",
      isNew: true,
      features: [
        "Hasselblad camera system",
        "100W SUPERVOOC charging",
        "Snapdragon 8 Gen 2 processor",
        "120Hz AMOLED display",
        "5000mAh battery"
      ]
    },
    {
      id: "xiaomi-14-pro",
      name: "Xiaomi 14 Pro",
      price: 899,
      description: "Co-engineered with Leica, featuring a 1-inch sensor, Snapdragon 8 Gen 2, and 120W HyperCharge.",
      image: "assets/phone-images/14t.jpg",
      features: [
        "Leica optics",
        "1-inch main camera sensor",
        "Snapdragon 8 Gen 2 processor",
        "120W HyperCharge",
        "IP68 water and dust resistance"
      ]
    },
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: string): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }
}
