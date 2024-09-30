export interface Store {
  id: string;
  image_url: string;
  name: string;
  location: string;
  phone: string;
  time: string;
  facebook: string;
  instagram: string;
  logo: string;
  ActiveDate: string;
}

export interface News {
  id: string;
  image: string;
  name: string;
  details: string;
  Date: string;
}

export interface Product{
  id:string;
  name:string;
  images:ProductImage[];
  details:string;
  categories: string;
  values: string[];
  qualities: string[];
  ethics: string[];
  benefits: string[];
  store:string
}

export interface ProductImage {
  id: number;
  image_url: string;
}
