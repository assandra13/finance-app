"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, Calendar, TrendingUp } from "lucide-react"

// Mock data for featured goals
const featuredGoals = [
  {
    id: 1,
    name: "Dana Darurat",
    targetAmount: 25000000,
    currentAmount: 18500000,
    deadline: "2024-12-31",
    priority: "high",
    category: "Keamanan",
    monthlyTarget: 1500000,
  },
  {
    id: 2,
    name: "Liburan Bali",
    targetAmount: 10000000,
    currentAmount: 6500000,
    deadline: "2024-06-15",
    priority: "medium",
    category: "Hiburan",
    monthlyTarget: 1000000,
  },
]

export function GoalsOverview() {
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
      month: "short",
      year: "numeric",
    })
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "default"
      default:
        return "default"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Tujuan Prioritas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {featuredGoals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100
          const daysLeft = getDaysUntilDeadline(goal.deadline)
          const isCompleted = progress >= 100

          return (
            <div key={goal.id} className="space-y-4 p-4 rounded-lg border bg-card/50">
              {/* Goal Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{goal.name}</h3>
                  <p className="text-sm text-muted-foreground">{goal.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getPriorityColor(goal.priority)}>
                    {goal.priority === "high" ? "Tinggi" : goal.priority === "medium" ? "Sedang" : "Rendah"}
                  </Badge>
                  {isCompleted && (
                    <Badge variant="default" className="bg-success text-success-foreground">
                      Tercapai!
                    </Badge>
                  )}
                </div>
              </div>

              {/* Progress Circle and Amount */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-8 border-muted flex items-center justify-center relative overflow-hidden">
                    <div
                      className="absolute inset-0 rounded-full border-8 border-primary transition-all duration-500"
                      style={{
                        clipPath: `polygon(50% 50%, 50% 0%, ${
                          progress >= 50 ? `100% 0%, 100% ${100 - (progress - 50) * 2}%` : `${50 + progress}% 0%`
                        }, 50% 50%)`,
                      }}
                    />
                    <span className="text-sm font-bold z-10">{Math.round(progress)}%</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium">
                      {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                    </span>
                  </div>
                  <Progress value={progress} className="h-3 mb-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Sisa: {formatCurrency(goal.targetAmount - goal.currentAmount)}</span>
                    <span>Target bulanan: {formatCurrency(goal.monthlyTarget)}</span>
                  </div>
                </div>
              </div>

              {/* Deadline and Actions */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Target: {formatDate(goal.deadline)}</span>
                  <span
                    className={`font-medium ${
                      daysLeft < 30 ? "text-destructive" : daysLeft < 90 ? "text-warning" : "text-muted-foreground"
                    }`}
                  >
                    ({daysLeft} hari lagi)
                  </span>
                </div>
                <Button size="sm" variant="outline" className="bg-transparent">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Tambah Kontribusi
                </Button>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
