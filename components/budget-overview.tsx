"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle } from "lucide-react"

// Mock budget data
const budgetOverview = {
  totalBudget: 8000000,
  totalSpent: 6250000,
  remaining: 1750000,
  percentageUsed: 78,
  categoriesOverBudget: 2,
  categoriesOnTrack: 5,
  monthlyIncome: 8500000,
  savingsRate: 15,
}

export function BudgetOverview() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getBudgetStatus = (percentage: number) => {
    if (percentage >= 100) return { color: "destructive", text: "Melebihi Budget" }
    if (percentage >= 80) return { color: "secondary", text: "Hampir Habis" }
    return { color: "default", text: "Aman" }
  }

  const budgetStatus = getBudgetStatus(budgetOverview.percentageUsed)

  return (
    <div className="space-y-6">
      {/* Main Budget Card */}
      <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Budget Bulanan</span>
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
              {budgetStatus.text}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{formatCurrency(budgetOverview.totalBudget)}</p>
              <p className="text-sm opacity-80">Total Budget</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-semibold">{formatCurrency(budgetOverview.remaining)}</p>
              <p className="text-sm opacity-80">Sisa Budget</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Terpakai</span>
              <span>{budgetOverview.percentageUsed}%</span>
            </div>
            <Progress value={budgetOverview.percentageUsed} className="h-3 bg-primary-foreground/20" />
            <p className="text-xs opacity-80">
              {formatCurrency(budgetOverview.totalSpent)} dari {formatCurrency(budgetOverview.totalBudget)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-success to-success/80 text-success-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Pemasukan</p>
                <p className="text-xl font-bold">{formatCurrency(budgetOverview.monthlyIncome)}</p>
              </div>
              <TrendingUp className="h-6 w-6 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Pengeluaran</p>
                <p className="text-xl font-bold">{formatCurrency(budgetOverview.totalSpent)}</p>
              </div>
              <TrendingDown className="h-6 w-6 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning to-warning/80 text-warning-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Tingkat Tabungan</p>
                <p className="text-xl font-bold">{budgetOverview.savingsRate}%</p>
              </div>
              <DollarSign className="h-6 w-6 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Kategori Bermasalah</p>
                <p className="text-xl font-bold">{budgetOverview.categoriesOverBudget}</p>
              </div>
              <AlertTriangle className="h-6 w-6 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
