"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, ChevronRight } from "lucide-react"
import type { Order } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"

export default function OrdersPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Load orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    // Filter orders by user email
    const userOrders = allOrders.filter((order: Order) => order.customerInfo.email === user?.email)
    setOrders(userOrders.reverse()) // Show newest first
    setLoading(false)
  }, [isAuthenticated, router, user])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-muted p-6">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">No orders yet</h1>
          <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
          <Link href="/">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Order {order.id}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground capitalize">{order.status}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {order.items.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0 rounded-lg bg-muted overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium line-clamp-1">{item.title}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                {order.items.length > 3 && (
                  <p className="text-sm text-muted-foreground">+{order.items.length - 3} more items</p>
                )}
              </div>

              <Link href={`/order-confirmation?orderId=${order.id}`}>
                <Button variant="outline" className="w-full bg-transparent">
                  View Details
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
