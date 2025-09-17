"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown, TrendingUp, Users, Calendar } from "lucide-react"

// Mock data
const debtOverview = {
  totalDebt: 15000000,
  totalCredit: 8500000,
  netDebt: 6500000,
  debtCount: 5,
  creditCount: 3,
  upcomingPayments: 2,
  overduePayments: 1,
}

export function DebtOverview() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Hutang</CardTitle>
          <TrendingDown className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(debtOverview.totalDebt)}</div>
          <p className="text-xs text-destructive-foreground/80 mt-1">{debtOverview.debtCount} hutang aktif</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-success to-success/80 text-success-foreground">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Piutang</CardTitle>
          <TrendingUp className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(debtOverview.totalCredit)}</div>
          <p className="text-xs text-success-foreground/80 mt-1">{debtOverview.creditCount} piutang aktif</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Hutang Bersih</CardTitle>
          <Users className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(debtOverview.netDebt)}</div>
          <p className="text-xs text-primary-foreground/80 mt-1">Selisih hutang-piutang</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-warning to-warning/80 text-warning-foreground">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Jatuh Tempo</CardTitle>
          <Calendar className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{debtOverview.upcomingPayments}</div>
          <p className="text-xs text-warning-foreground/80 mt-1">{debtOverview.overduePayments} terlambat</p>
        </CardContent>
      </Card>
    </div>
  )
}
