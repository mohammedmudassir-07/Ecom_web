"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"
import type { Product } from "@/lib/types"
import { useCart } from "@/context/cart-context"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    addToCart(product)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsAdding(false)
  }

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-contain p-4 transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-base line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-muted-foreground">
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>
        <p className="text-sm text-muted-foreground capitalize mb-3">{product.category}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full" disabled={isAdding}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isAdding ? "Adding..." : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}
