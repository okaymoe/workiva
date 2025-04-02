export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    isNew?: boolean;
    features: string[];
  }
  