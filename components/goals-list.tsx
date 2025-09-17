"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GoalModal } from "@/components/goal-modal"
import { ContributionModal } from "@/components/contribution-modal"
import {
  MoreHorizontal,
  Target,
  Calendar,
  TrendingUp,
  Edit,
  Trash2,
  Plus,
  Home,
  Car,
  Plane,
  Shield,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock goals data
const mockGoals = [
  {
    id: 1,
    name: "Dana Darurat",
    description: "Dana untuk kebutuhan mendesak",
    targetAmount: 25000000,
    currentAmount: 18500000,
    deadline: "2024-12-31",
    priority: "high",
    category: "Keamanan",
    monthlyTarget: 1500000,
    icon: Shield,
    color: "text-red-500",
    contributions: [
      { date: "2024-01-15", amount: 2000000 },
      { date: "2024-01-01", amount: 1500000 },
    ],
  },
  {
    id: 2,
    name: "Liburan Bali",
    description: "Liburan keluarga ke Bali",
    targetAmount: 10000000,
    currentAmount: 6500000,
    deadline: "2024-06-15",
    priority: "medium",
    category: "Hiburan",
    monthlyTarget: 1000000,
    icon: Plane,
    color: "text-blue-500",
    contributions: [
      { date: "2024-01-10", amount: 1000000 },
      { date: "2023-12-15", amount: 1500000 },
    ],
  },
  {
    id: 3,
    name: "DP Rumah",
    description: "Down payment untuk rumah impian",
    targetAmount: 100000000,
    currentAmount: 15000000,
    deadline: "2025-12-31",
    priority: "high",
    category: "Properti",
    monthlyTarget: 5000000,
    icon: Home,
    color: "text-green-500",
    contributions: [
      { date: "2024-01-01", amount: 5000000 },
      { date: "2023-12-01", amount: 5000000 },
    ],
  },
  {
    id: 4,
    name: "Mobil Baru",
    description: "Ganti mobil yang lebih baik",
    targetAmount: 200000000,
    currentAmount: 25000000,
    deadline: "2025-06-30",
    priority: "low",
    category: "Kendaraan",
    monthlyTarget: 8000000,
    icon: Car,
    color: "text-purple-500",
    contributions: [
      { date: "2024-01-01", amount: 10000000 },
      { date: "2023-11-01", amount: 15000000 },
    ],
  },
]

export function GoalsList() {
  const [selectedGoal, setSelectedGoal] = useState<any>(null)
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false)
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("all")

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

  const handleEditGoal = (goal: any) => {
    setSelectedGoal(goal)
    setIsGoalModalOpen(true)
  }

  const handleDeleteGoal = (goalId: number) => {
    console.log("Delete goal:", goalId)
    // In real app, this would call an API to delete the goal
  }

  const handleAddContribution = (goal: any) => {
    setSelectedGoal(goal)
    setIsContributionModalOpen(true)
  }

  const filteredGoals = mockGoals.filter((goal) => {
    if (selectedFilter === "all") return true
    if (selectedFilter === "active") return (goal.currentAmount / goal.targetAmount) * 100 < 100
    if (selectedFilter === "completed") return (goal.currentAmount / goal.targetAmount) * 100 >= 100
    if (selectedFilter === "urgent") return getDaysUntilDeadline(goal.deadline) <= 30
    return true
  })

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Semua Tujuan</CardTitle>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={selectedFilter === "all" ? "default" : "outline"}
                onClick={() => setSelectedFilter("all")}
                className="bg-transparent"
              >
                Semua
              </Button>
              <Button
                size="sm"
                variant={selectedFilter === "active" ? "default" : "outline"}
                onClick={() => setSelectedFilter("active")}
                className="bg-transparent"
              >
                Aktif
              </Button>
              <Button
                size="sm"
                variant={selectedFilter === "urgent" ? "default" : "outline"}
                onClick={() => setSelectedFilter("urgent")}
                className="bg-transparent"
              >
                Mendesak
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredGoals.map((goal) => {
            const Icon = goal.icon
            const progress = (goal.currentAmount / goal.targetAmount) * 100
            const daysLeft = getDaysUntilDeadline(goal.deadline)
            const isCompleted = progress >= 100

            return (
              <div
                key={goal.id}
                className="p-4 rounded-lg border hover:bg-muted/50 transition-colors group cursor-pointer"
                onClick={() => handleEditGoal(goal)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full bg-muted ${goal.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{goal.name}</h3>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </div>
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAddContribution(goal)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Tambah Kontribusi
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditGoal(goal)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteGoal(goal.id)} className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                    </span>
                    <span>Sisa: {formatCurrency(goal.targetAmount - goal.currentAmount)}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Target: {formatDate(goal.deadline)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span>Bulanan: {formatCurrency(goal.monthlyTarget)}</span>
                  </div>
                </div>

                {/* Days Left */}
                <div className="mt-3 pt-3 border-t flex items-center justify-between">
                  <span
                    className={`text-sm font-medium ${
                      daysLeft < 30 ? "text-destructive" : daysLeft < 90 ? "text-warning" : "text-muted-foreground"
                    }`}
                  >
                    {daysLeft < 0 ? `${Math.abs(daysLeft)} hari terlambat` : `${daysLeft} hari lagi`}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddContribution(goal)
                    }}
                    className="bg-transparent"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Kontribusi
                  </Button>
                </div>
              </div>
            )
          })}

          {/* Empty State */}
          {filteredGoals.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Belum ada tujuan</h3>
              <p className="text-muted-foreground mb-4">Mulai tetapkan tujuan keuangan Anda</p>
              <Button>Tambah Tujuan</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Goal Modal */}
      <GoalModal
        isOpen={isGoalModalOpen}
        onClose={() => {
          setIsGoalModalOpen(false)
          setSelectedGoal(null)
        }}
        goal={selectedGoal}
      />

      {/* Contribution Modal */}
      <ContributionModal
        isOpen={isContributionModalOpen}
        onClose={() => {
          setIsContributionModalOpen(false)
          setSelectedGoal(null)
        }}
        goal={selectedGoal}
      />
    </>
  )
}
