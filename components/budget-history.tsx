"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, TrendingUp, TrendingDown } from "lucide-react"

// Mock budget history data
const budgetHistory = [
  {
    month: "Januari 2024",
    totalBudget: 8000000,
    totalSpent: 6250000,
    percentageUsed: 78,
    status: "good",
    categoriesOverBudget: 2,
    savings: 1750000,
  },
  {
    month: "Desember 2023",
    totalBudget: 7500000,
    totalSpent: 7800000,
    percentageUsed: 104,
    status: "over",
    categoriesOverBudget: 4,
    savings: -300000,
  },
  {
    month: "November 2023",
    totalBudget: 7500000,
    totalSpent: 6900000,
    percentageUsed: 92,
    status: "warning",
    categoriesOverBudget: 1,
    savings: 600000,
  },
  {
    month: "Oktober 2023",
    totalBudget: 7000000,
    totalSpent: 5800000,
    percentageUsed: 83,
    status: "good",
    categoriesOverBudget: 0,
    savings: 1200000,
  },
]

export function BudgetHistory() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "good":
        return <Badge variant="default">Baik</Badge>
      case "warning":
        return <Badge variant="secondary">Peringatan</Badge>
      case "over":
        return <Badge variant="destructive">Melebihi</Badge>
      default:
        return <Badge variant="default">Normal</Badge>
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-success"
      case "warning":
        return "text-warning"
      case "over":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Riwayat Budget
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {budgetHistory.map((history, index) => (
          <div key={index} className="p-4 rounded-lg border bg-card/50 space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{history.month}</h3>
              <div className="flex items-center gap-2">
                {getStatusBadge(history.status)}
                {history.savings >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Penggunaan Budget</span>
                <span className={`font-medium ${getStatusColor(history.status)}`}>{history.percentageUsed}%</span>
              </div>
              <Progress
                value={Math.min(history.percentageUsed, 100)}
                className={`h-2 ${
                  history.status === "over"
                    ? "[&>div]:bg-destructive"
                    : history.status === "warning"
                      ? "[&>div]:bg-warning"
                      : "[&>div]:bg-success"
                }`}
              />
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total Budget</p>
                <p className="font-semibold">{formatCurrency(history.totalBudget)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Terpakai</p>
                <p className="font-semibold">{formatCurrency(history.totalSpent)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Kategori Bermasalah</p>
                <p className="font-semibold">{history.categoriesOverBudget}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Sisa/Kelebihan</p>
                <p className={`font-semibold ${history.savings >= 0 ? "text-success" : "text-destructive"}`}>
                  {formatCurrency(Math.abs(history.savings))}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Summary */}
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
          <h4 className="font-semibold text-primary mb-2">Ringkasan 4 Bulan Terakhir</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Rata-rata Penggunaan</p>
              <p className="font-semibold">
                {Math.round(budgetHistory.reduce((acc, h) => acc + h.percentageUsed, 0) / budgetHistory.length)}%
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Tabungan</p>
              <p className="font-semibold text-success">
                {formatCurrency(budgetHistory.reduce((acc, h) => acc + Math.max(h.savings, 0), 0))}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
