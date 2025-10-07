export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface CartItem extends Product {
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  customerInfo: CheckoutFormData
  createdAt: string
  status: "pending" | "processing" | "completed"
}

export interface CheckoutFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  paymentMethod: "credit-card" | "debit-card" | "paypal"
}
