"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ArrowLeft, Star } from "lucide-react"
import { useCart } from "@/context/cart-context"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${params.id}`)
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.error("[v0] Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  const handleAddToCart = async () => {
    if (!product) return
    setIsAdding(true)
    addToCart(product)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsAdding(false)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-4">Product not found</p>
          <Button onClick={() => router.push("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
          <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-contain p-8" />
        </div>

        <div className="flex flex-col">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">{product.category}</p>
            <h1 className="text-3xl font-bold mb-4 text-balance">{product.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{product.rating.rate}</span>
              </div>
              <span className="text-muted-foreground">({product.rating.count} reviews)</span>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-4xl font-bold mb-4">${product.price.toFixed(2)}</p>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          <div className="mt-auto space-y-3">
            <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={isAdding}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              {isAdding ? "Adding to Cart..." : "Add to Cart"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => {
                addToCart(product)
                router.push("/cart")
              }}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
