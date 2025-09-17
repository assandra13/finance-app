"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"

// Mock data
const stats = {
  totalIncome: 8500000,
  totalExpenses: 6250000,
  netIncome: 2250000,
  transactionCount: 47,
}

export function TransactionStats() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-gradient-to-br from-success to-success/80 text-success-foreground">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Pemasukan</p>
              <p className="text-2xl font-bold">{formatCurrency(stats.totalIncome)}</p>
            </div>
            <TrendingUp className="h-8 w-8 opacity-80" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Pengeluaran</p>
              <p className="text-2xl font-bold">{formatCurrency(stats.totalExpenses)}</p>
            </div>
            <TrendingDown className="h-8 w-8 opacity-80" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Saldo Bersih</p>
              <p className="text-2xl font-bold">{formatCurrency(stats.netIncome)}</p>
              <p className="text-xs opacity-80">{stats.transactionCount} transaksi</p>
            </div>
            <DollarSign className="h-8 w-8 opacity-80" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
