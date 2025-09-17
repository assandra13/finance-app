"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DebtModal } from "@/components/debt-modal"
import { MoreHorizontal, User, Calendar, Building, Edit, Trash2, CheckCircle, AlertCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock credit data
const mockCredits = [
  {
    id: 1,
    debtor: "Teman - Sari",
    type: "Pinjaman Pribadi",
    totalAmount: 5000000,
    remainingAmount: 3000000,
    monthlyPayment: 500000,
    dueDate: "2024-01-28",
    status: "active",
    interestRate: 0,
    startDate: "2023-08-01",
    endDate: "2024-08-01",
    icon: User,
    color: "text-green-500",
  },
  {
    id: 2,
    debtor: "Adik - Rina",
    type: "Pinjaman Keluarga",
    totalAmount: 2000000,
    remainingAmount: 1500000,
    monthlyPayment: 250000,
    dueDate: "2024-01-15",
    status: "overdue",
    interestRate: 0,
    startDate: "2023-09-01",
    endDate: "2024-09-01",
    icon: User,
    color: "text-blue-500",
  },
  {
    id: 3,
    debtor: "Rekan Bisnis - PT ABC",
    type: "Pinjaman Bisnis",
    totalAmount: 15000000,
    remainingAmount: 10000000,
    monthlyPayment: 1500000,
    dueDate: "2024-02-01",
    status: "active",
    interestRate: 1.0,
    startDate: "2023-06-01",
    endDate: "2024-12-01",
    icon: Building,
    color: "text-purple-500",
  },
]

export function CreditList() {
  const [selectedCredit, setSelectedCredit] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getStatusBadge = (status: string, dueDate: string) => {
    const daysUntilDue = getDaysUntilDue(dueDate)

    if (status === "overdue" || daysUntilDue < 0) {
      return <Badge variant="destructive">Terlambat</Badge>
    } else if (daysUntilDue <= 3) {
      return <Badge variant="secondary">Jatuh Tempo</Badge>
    } else {
      return <Badge variant="default">Aktif</Badge>
    }
  }

  const handleEditCredit = (credit: any) => {
    setSelectedCredit(credit)
    setIsModalOpen(true)
  }

  const handleDeleteCredit = (creditId: number) => {
    console.log("Delete credit:", creditId)
    // In real app, this would call an API to delete the credit
  }

  const handleReceivePayment = (creditId: number) => {
    console.log("Receive payment:", creditId)
    // In real app, this would record a payment received
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Piutang</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockCredits.map((credit) => {
            const Icon = credit.icon
            const progress = ((credit.totalAmount - credit.remainingAmount) / credit.totalAmount) * 100
            const daysUntilDue = getDaysUntilDue(credit.dueDate)

            return (
              <div
                key={credit.id}
                className="p-4 rounded-lg border hover:bg-muted/50 transition-colors group cursor-pointer"
                onClick={() => handleEditCredit(credit)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full bg-muted ${credit.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{credit.debtor}</h3>
                      <p className="text-sm text-muted-foreground">{credit.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(credit.status, credit.dueDate)}
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
                        <DropdownMenuItem onClick={() => handleReceivePayment(credit.id)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Terima Bayar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditCredit(credit)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteCredit(credit.id)} className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Amount Info */}
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Sisa Piutang</p>
                    <p className="font-semibold text-success">{formatCurrency(credit.remainingAmount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Cicilan Bulanan</p>
                    <p className="font-semibold">{formatCurrency(credit.monthlyPayment)}</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-xs">
                    <span>Progress Pembayaran</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(credit.totalAmount - credit.remainingAmount)} dari{" "}
                    {formatCurrency(credit.totalAmount)}
                  </p>
                </div>

                {/* Due Date */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Jatuh tempo: {formatDate(credit.dueDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {daysUntilDue < 0 ? (
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    ) : daysUntilDue <= 3 ? (
                      <AlertCircle className="h-4 w-4 text-warning" />
                    ) : null}
                    <span
                      className={
                        daysUntilDue < 0
                          ? "text-destructive"
                          : daysUntilDue <= 3
                            ? "text-warning"
                            : "text-muted-foreground"
                      }
                    >
                      {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} hari terlambat` : `${daysUntilDue} hari lagi`}
                    </span>
                  </div>
                </div>

                {/* Interest Rate */}
                {credit.interestRate > 0 && (
                  <div className="mt-2 pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Bunga: {credit.interestRate}% per bulan</p>
                  </div>
                )}
              </div>
            )
          })}

          {/* Empty State */}
          {mockCredits.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Belum ada piutang</h3>
              <p className="text-muted-foreground mb-4">Mulai catat piutang Anda untuk pengelolaan yang lebih baik</p>
              <Button>Tambah Piutang</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Credit Modal */}
      <DebtModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedCredit(null)
        }}
        debt={selectedCredit}
        type="credit"
      />
    </>
  )
}
