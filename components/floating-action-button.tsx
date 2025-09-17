"use client"

import type React from "react"

import { useState } from "react"
import { Plus, CreditCard, Target, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FABAction {
  icon: React.ComponentType<{ className?: string }>
  label: string
  onClick: () => void
  color?: string
}

interface FloatingActionButtonProps {
  actions?: FABAction[]
  className?: string
}

export function FloatingActionButton({
  actions = [
    {
      icon: CreditCard,
      label: "Tambah Transaksi",
      onClick: () => console.log("Add transaction"),
      color: "bg-primary hover:bg-primary/90",
    },
    {
      icon: Target,
      label: "Tambah Tujuan",
      onClick: () => console.log("Add goal"),
      color: "bg-success hover:bg-success/90",
    },
    {
      icon: Calendar,
      label: "Tambah Tagihan",
      onClick: () => console.log("Add bill"),
      color: "bg-warning hover:bg-warning/90",
    },
  ],
  className,
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn("fixed bottom-20 right-4 z-40 md:bottom-6", className)}>
      {/* Action Buttons */}
      {isOpen && (
        <div className="flex flex-col gap-3 mb-4">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <div
                key={index}
                className="flex items-center gap-3 animate-in slide-in-from-bottom-2 duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="bg-card text-card-foreground px-3 py-2 rounded-lg text-sm font-medium shadow-lg border whitespace-nowrap">
                  {action.label}
                </span>
                <Button
                  size="sm"
                  onClick={() => {
                    action.onClick()
                    setIsOpen(false)
                  }}
                  className={cn("h-12 w-12 rounded-full shadow-lg", action.color || "bg-primary hover:bg-primary/90")}
                >
                  <Icon className="h-5 w-5" />
                </Button>
              </div>
            )
          })}
        </div>
      )}

      {/* Main FAB */}
      <Button
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
        className={cn("h-14 w-14 rounded-full shadow-lg transition-transform", isOpen && "rotate-45")}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  )
}
