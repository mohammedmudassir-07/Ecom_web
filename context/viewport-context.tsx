"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type ViewportMode = "desktop" | "mobile"

interface ViewportContextType {
  viewportMode: ViewportMode
  toggleViewportMode: () => void
}

const ViewportContext = createContext<ViewportContextType | undefined>(undefined)

export function ViewportProvider({ children }: { children: React.ReactNode }) {
  const [viewportMode, setViewportMode] = useState<ViewportMode>("desktop")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedMode = localStorage.getItem("viewportMode") as ViewportMode | null
    if (savedMode) {
      setViewportMode(savedMode)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("viewportMode", viewportMode)
    }
  }, [viewportMode, mounted])

  const toggleViewportMode = () => {
    setViewportMode((prev) => (prev === "desktop" ? "mobile" : "desktop"))
  }

  return <ViewportContext.Provider value={{ viewportMode, toggleViewportMode }}>{children}</ViewportContext.Provider>
}

export function useViewport() {
  const context = useContext(ViewportContext)
  if (context === undefined) {
    throw new Error("useViewport must be used within a ViewportProvider")
  }
  return context
}
