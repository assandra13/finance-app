"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Wallet, Target, CreditCard, PiggyBank } from "lucide-react"
import { FinancialChart } from "@/components/financial-chart"

// Mock data - in real app this would come from API/database
const mockData = {
  balance: 15750000,
  income: 8500000,
  expenses: 6250000,
  savings: 2500000,
  budgetUsed: 75,
  goals: [
    { name: "Liburan Bali", target: 10000000, current: 6500000, progress: 65 },
    { name: "Dana Darurat", target: 25000000, current: 15750000, progress: 63 },
  ],
}

export function DashboardOverview() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const incomeVsExpenses = [
    { name: "Pemasukan", value: mockData.income, color: "hsl(var(--success))" },
    { name: "Pengeluaran", value: mockData.expenses, color: "hsl(var(--destructive))" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-balance">Selamat Datang Kembali!</h1>
        <p className="text-muted-foreground mt-1">Berikut ringkasan keuangan Anda bulan ini</p>
      </div>

      {/* Balance Cards - Mobile Optimized */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium drop-shadow-sm">Saldo Total</CardTitle>
            <Wallet className="h-4 w-4 drop-shadow-sm" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold drop-shadow-sm">{formatCurrency(mockData.balance)}</div>
            <p className="text-xs text-primary-foreground/90 mt-1 drop-shadow-sm">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success to-success/90 text-success-foreground shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium drop-shadow-sm">Pemasukan</CardTitle>
            <TrendingUp className="h-4 w-4 drop-shadow-sm" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold drop-shadow-sm">{formatCurrency(mockData.income)}</div>
            <p className="text-xs text-success-foreground/90 mt-1 drop-shadow-sm">Bulan ini</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-destructive to-destructive/90 text-destructive-foreground shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium drop-shadow-sm">Pengeluaran</CardTitle>
            <TrendingDown className="h-4 w-4 drop-shadow-sm" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold drop-shadow-sm">{formatCurrency(mockData.expenses)}</div>
            <p className="text-xs text-destructive-foreground/90 mt-1 drop-shadow-sm">Bulan ini</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning to-warning/90 text-warning-foreground shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium drop-shadow-sm">Tabungan</CardTitle>
            <PiggyBank className="h-4 w-4 drop-shadow-sm" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold drop-shadow-sm">{formatCurrency(mockData.savings)}</div>
            <p className="text-xs text-warning-foreground/90 mt-1 drop-shadow-sm">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              Target tercapai
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Pemasukan vs Pengeluaran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FinancialChart data={incomeVsExpenses} />
          </CardContent>
        </Card>

        {/* Budget Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Progress Budget Bulanan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Budget Terpakai</span>
                <Badge
                  variant={
                    mockData.budgetUsed > 80 ? "destructive" : mockData.budgetUsed > 60 ? "secondary" : "default"
                  }
                >
                  {mockData.budgetUsed}%
                </Badge>
              </div>
              <Progress value={mockData.budgetUsed} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {formatCurrency(mockData.expenses)} dari {formatCurrency(mockData.income)}
              </p>
            </div>

            {/* Goals Progress */}
            <div className="space-y-3 pt-4 border-t">
              <h4 className="text-sm font-medium">Tujuan Keuangan</h4>
              {mockData.goals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{goal.name}</span>
                    <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-1.5" />
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
