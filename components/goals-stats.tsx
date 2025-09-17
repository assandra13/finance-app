"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Target, TrendingUp, Calendar, Trophy } from "lucide-react"

// Mock data
const goalsStats = {
  totalGoals: 4,
  completedGoals: 1,
  totalTargetAmount: 85000000,
  totalSavedAmount: 42500000,
  averageProgress: 68,
  nextGoalDeadline: "2024-06-15",
}

export function GoalsStats() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Tujuan</p>
              <p className="text-2xl font-bold">{goalsStats.totalGoals}</p>
              <p className="text-xs opacity-80">{goalsStats.completedGoals} tercapai</p>
            </div>
            <Target className="h-8 w-8 opacity-80" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-success to-success/80 text-success-foreground">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Tabungan</p>
              <p className="text-xl font-bold">{formatCurrency(goalsStats.totalSavedAmount)}</p>
            </div>
            <TrendingUp className="h-8 w-8 opacity-80" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-warning to-warning/80 text-warning-foreground">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Rata-rata Progress</p>
              <p className="text-2xl font-bold">{goalsStats.averageProgress}%</p>
            </div>
            <Trophy className="h-8 w-8 opacity-80" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Target Terdekat</p>
              <p className="text-sm font-bold">{formatDate(goalsStats.nextGoalDeadline)}</p>
            </div>
            <Calendar className="h-8 w-8 opacity-80" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
