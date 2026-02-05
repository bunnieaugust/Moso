export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  colSpan?: string;
  rowSpan?: string;
  tags?: string[];
  featured?: boolean;
  ingredients?: string[];
  benefits?: string[];
  usage?: string;
  category?: 'tea' | 'gift' | 'combo'; // Added category
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface NavItem {
  label: string;
  href: string;
  type?: 'scroll' | 'view'; // Added type to distinguish between scroll sections and new pages
}

export interface OrderInfo {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  note?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered';

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: CartItem[];
  total: number;
  shippingInfo: OrderInfo;
  paymentMethod: string;
}