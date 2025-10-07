"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Package } from "lucide-react"
import type { Order } from "@/lib/types"
import Image from "next/image"

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (!orderId) {
      router.push("/")
      return
    }

    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    const foundOrder = orders.find((o: Order) => o.id === orderId)

    if (foundOrder) {
      setOrder(foundOrder)
    } else {
      router.push("/")
    }
  }, [orderId, router])

  if (!order) {
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
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-green-500/10 p-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground text-lg">Thank you for your purchase</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4 pb-4 border-b border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                <p className="font-mono font-semibold">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="pb-4 border-b border-border">
              <p className="text-sm text-muted-foreground mb-2">Shipping Address</p>
              <p className="font-medium">
                {order.customerInfo.firstName} {order.customerInfo.lastName}
              </p>
              <p className="text-sm text-muted-foreground">{order.customerInfo.address}</p>
              <p className="text-sm text-muted-foreground">
                {order.customerInfo.city}, {order.customerInfo.state} {order.customerInfo.zipCode}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-3">Items Ordered</p>
              <div className="space-y-3">
                {order.items.map((item) => (
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
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-center">
          <Button onClick={() => router.push("/")} size="lg">
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  )
}
