"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BudgetModal } from "@/components/budget-modal"
import {
  MoreHorizontal,
  ShoppingCart,
  Car,
  Home,
  Utensils,
  Heart,
  Gamepad2,
  Edit,
  Trash2,
  Plus,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock budget categories data
const mockBudgetCategories = [
  {
    id: 1,
    name: "Makanan",
    budgetAmount: 2000000,
    spentAmount: 1850000,
    icon: Utensils,
    color: "text-orange-500",
    transactions: 23,
    lastTransaction: "2024-01-15",
  },
  {
    id: 2,
    name: "Transportasi",
    budgetAmount: 1500000,
    spentAmount: 1650000,
    icon: Car,
    color: "text-blue-500",
    transactions: 15,
    lastTransaction: "2024-01-14",
  },
  {
    id: 3,
    name: "Belanja",
    budgetAmount: 1000000,
    spentAmount: 750000,
    icon: ShoppingCart,
    color: "text-purple-500",
    transactions: 8,
    lastTransaction: "2024-01-13",
  },
  {
    id: 4,
    name: "Rumah",
    budgetAmount: 2500000,
    spentAmount: 2450000,
    icon: Home,
    color: "text-green-500",
    transactions: 5,
    lastTransaction: "2024-01-01",
  },
  {
    id: 5,
    name: "Kesehatan",
    budgetAmount: 500000,
    spentAmount: 300000,
    icon: Heart,
    color: "text-red-500",
    transactions: 2,
    lastTransaction: "2024-01-10",
  },
  {
    id: 6,
    name: "Hiburan",
    budgetAmount: 800000,
    spentAmount: 450000,
    icon: Gamepad2,
    color: "text-pink-500",
    transactions: 6,
    lastTransaction: "2024-01-12",
  },
]

export function BudgetCategories() {
  const [selectedBudget, setSelectedBudget] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")

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
    })
  }

  const getBudgetStatus = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100
    if (percentage >= 100) return { status: "over", color: "destructive", text: "Melebihi" }
    if (percentage >= 80) return { status: "warning", color: "secondary", text: "Hampir Habis" }
    return { status: "safe", color: "default", text: "Aman" }
  }

  const handleEditBudget = (budget: any) => {
    setSelectedBudget(budget)
    setIsModalOpen(true)
  }

  const handleDeleteBudget = (budgetId: number) => {
    console.log("Delete budget:", budgetId)
    // In real app, this would call an API to delete the budget
  }

  const filteredCategories = mockBudgetCategories.filter((category) => {
    const status = getBudgetStatus(category.spentAmount, category.budgetAmount).status
    if (filterStatus === "all") return true
    if (filterStatus === "over") return status === "over"
    if (filterStatus === "warning") return status === "warning"
    if (filterStatus === "safe") return status === "safe"
    return true
  })

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Budget per Kategori</CardTitle>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                className="bg-transparent"
              >
                Semua
              </Button>
              <Button
                size="sm"
                variant={filterStatus === "over" ? "default" : "outline"}
                onClick={() => setFilterStatus("over")}
                className="bg-transparent"
              >
                Melebihi
              </Button>
              <Button
                size="sm"
                variant={filterStatus === "warning" ? "default" : "outline"}
                onClick={() => setFilterStatus("warning")}
                className="bg-transparent"
              >
                Peringatan
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredCategories.map((category) => {
            const Icon = category.icon
            const percentage = (category.spentAmount / category.budgetAmount) * 100
            const budgetStatus = getBudgetStatus(category.spentAmount, category.budgetAmount)
            const remaining = category.budgetAmount - category.spentAmount

            return (
              <div
                key={category.id}
                className="p-4 rounded-lg border hover:bg-muted/50 transition-colors group cursor-pointer"
                onClick={() => handleEditBudget(category)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full bg-muted ${category.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {category.transactions} transaksi • Terakhir {formatDate(category.lastTransaction)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={budgetStatus.color}>{budgetStatus.text}</Badge>
                    {budgetStatus.status === "over" && <AlertTriangle className="h-4 w-4 text-destructive" />}
                    {budgetStatus.status === "safe" && <CheckCircle className="h-4 w-4 text-success" />}
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
                        <DropdownMenuItem onClick={() => handleEditBudget(category)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Budget
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteBudget(category.id)} className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Budget Progress */}
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span>Terpakai</span>
                    <span className="font-medium">{Math.round(percentage)}%</span>
                  </div>
                  <Progress
                    value={Math.min(percentage, 100)}
                    className={`h-2 ${
                      budgetStatus.status === "over"
                        ? "[&>div]:bg-destructive"
                        : budgetStatus.status === "warning"
                          ? "[&>div]:bg-warning"
                          : "[&>div]:bg-success"
                    }`}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      {formatCurrency(category.spentAmount)} / {formatCurrency(category.budgetAmount)}
                    </span>
                    <span
                      className={
                        remaining < 0
                          ? "text-destructive font-medium"
                          : remaining < category.budgetAmount * 0.2
                            ? "text-warning font-medium"
                            : ""
                      }
                    >
                      {remaining < 0 ? "Melebihi " : "Sisa "}
                      {formatCurrency(Math.abs(remaining))}
                    </span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="text-xs text-muted-foreground">
                    Rata-rata per hari: {formatCurrency(category.spentAmount / 15)}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditBudget(category)
                    }}
                    className="bg-transparent"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            )
          })}

          {/* Add New Budget Category */}
          <Button
            variant="outline"
            className="w-full h-16 border-dashed bg-transparent"
            onClick={() => {
              setSelectedBudget(null)
              setIsModalOpen(true)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Tambah Kategori Budget
          </Button>

          {/* Empty State */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Tidak ada kategori budget</h3>
              <p className="text-muted-foreground mb-4">Mulai buat budget untuk kategori pengeluaran Anda</p>
              <Button>Tambah Budget</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Budget Modal */}
      <BudgetModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedBudget(null)
        }}
        budget={selectedBudget}
      />
    </>
  )
}
