"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, MoreHorizontal, ShoppingCart, Car, Coffee, Zap } from "lucide-react"

// Mock transaction data
const recentTransactions = [
  {
    id: 1,
    type: "expense",
    category: "Belanja",
    description: "Supermarket ABC",
    amount: -350000,
    date: "2024-01-15",
    icon: ShoppingCart,
    color: "text-orange-500",
  },
  {
    id: 2,
    type: "income",
    category: "Gaji",
    description: "Gaji Bulanan",
    amount: 8500000,
    date: "2024-01-01",
    icon: ArrowUpRight,
    color: "text-green-500",
  },
  {
    id: 3,
    type: "expense",
    category: "Transportasi",
    description: "Bensin Motor",
    amount: -150000,
    date: "2024-01-14",
    icon: Car,
    color: "text-blue-500",
  },
  {
    id: 4,
    type: "expense",
    category: "Rumah",
    description: "Listrik PLN",
    amount: -450000,
    date: "2024-01-13",
    icon: Zap,
    color: "text-yellow-500",
  },
  {
    id: 5,
    type: "expense",
    category: "Makanan",
    description: "Kafe Corner",
    amount: -85000,
    date: "2024-01-12",
    icon: Coffee,
    color: "text-brown-500",
  },
]

export function RecentTransactions() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Math.abs(amount))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Transaksi Terbaru</CardTitle>
        <Button variant="ghost" size="sm">
          Lihat Semua
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentTransactions.map((transaction) => {
          const Icon = transaction.icon
          const isIncome = transaction.type === "income"

          return (
            <div
              key={transaction.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              {/* Icon */}
              <div className={`p-2 rounded-full bg-muted ${transaction.color}`}>
                <Icon className="h-4 w-4" />
              </div>

              {/* Transaction Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">{transaction.description}</p>
                  <p className={`font-semibold ${isIncome ? "text-success" : "text-destructive"}`}>
                    {isIncome ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {transaction.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{formatDate(transaction.date)}</span>
                </div>
              </div>

              {/* More Options */}
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          )
        })}

        {/* Empty State */}
        {recentTransactions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Belum ada transaksi</p>
            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
              Tambah Transaksi Pertama
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
