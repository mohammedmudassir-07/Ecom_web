"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Edit, Package, DollarSign, ShoppingCart, Users } from "lucide-react"
import type { Product, Order } from "@/lib/types"
import Image from "next/image"

export default function AdminPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  })

  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      router.push("/")
      return
    }

    // Load data
    async function loadData() {
      const response = await fetch("https://fakestoreapi.com/products")
      const productsData = await response.json()
      setProducts(productsData)

      const ordersData = JSON.parse(localStorage.getItem("orders") || "[]")
      setOrders(ordersData)
      setLoading(false)
    }

    loadData()
  }, [isAuthenticated, user, router])

  const handleAddProduct = () => {
    if (!newProduct.title || !newProduct.price || !newProduct.description || !newProduct.category) {
      alert("Please fill in all fields")
      return
    }

    const product: Product = {
      id: Date.now(),
      title: newProduct.title,
      price: Number.parseFloat(newProduct.price),
      description: newProduct.description,
      category: newProduct.category,
      image: newProduct.image || "/placeholder.svg",
      rating: { rate: 0, count: 0 },
    }

    setProducts([product, ...products])
    setNewProduct({ title: "", price: "", description: "", category: "", image: "" })
    setShowAddProduct(false)
  }

  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = orders.length
  const totalProducts = products.length

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="rounded-full bg-green-500/10 p-3">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                <p className="text-2xl font-bold">{totalOrders}</p>
              </div>
              <div className="rounded-full bg-blue-500/10 p-3">
                <ShoppingCart className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Products</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
              </div>
              <div className="rounded-full bg-purple-500/10 p-3">
                <Package className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Order Value</p>
                <p className="text-2xl font-bold">
                  ${totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : "0.00"}
                </p>
              </div>
              <div className="rounded-full bg-orange-500/10 p-3">
                <Users className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Manage Products</h2>
            <Button onClick={() => setShowAddProduct(!showAddProduct)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>

          {showAddProduct && (
            <Card>
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newProduct.title}
                      onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleAddProduct}>Add Product</Button>
                  <Button variant="outline" onClick={() => setShowAddProduct(false)} className="bg-transparent">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.slice(0, 12).map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <div className="relative aspect-square mb-3 bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <h3 className="font-semibold line-clamp-2 mb-2">{product.title}</h3>
                  <p className="text-lg font-bold mb-3">${product.price.toFixed(2)}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-destructive hover:text-destructive bg-transparent"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <h2 className="text-2xl font-bold">Recent Orders</h2>

          {orders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No orders yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 10).map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.customerInfo.firstName} {order.customerInfo.lastName} - {order.customerInfo.email}
                        </p>
                        <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground capitalize">{order.status}</p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
