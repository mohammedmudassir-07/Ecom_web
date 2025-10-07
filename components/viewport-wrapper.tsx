"use client"

import type React from "react"

import { useViewport } from "@/context/viewport-context"

export function ViewportWrapper({ children }: { children: React.ReactNode }) {
  const { viewportMode } = useViewport()

  return <div className={viewportMode === "mobile" ? "mx-auto max-w-[375px]" : ""}>{children}</div>
}
