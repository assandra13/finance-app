"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TransactionModal } from "@/components/transaction-modal"
import {
  MoreHorizontal,
  ShoppingCart,
  Car,
  Coffee,
  Zap,
  Home,
  Heart,
  GraduationCap,
  TrendingUp,
  Edit,
  Trash2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock transaction data with more variety
const mockTransactions = [
  {
    id: 1,
    type: "expense",
    category: "Belanja",
    description: "Supermarket ABC",
    amount: -350000,
    date: "2024-01-15T10:30:00",
    paymentMethod: "Kartu Debit",
    location: "Jakarta Selatan",
    icon: ShoppingCart,
    color: "text-orange-500",
  },
  {
    id: 2,
    type: "income",
    category: "Gaji",
    description: "Gaji Bulanan",
    amount: 8500000,
    date: "2024-01-01T09:00:00",
    paymentMethod: "Transfer Bank",
    location: "Jakarta",
    icon: TrendingUp,
    color: "text-green-500",
  },
  {
    id: 3,
    type: "expense",
    category: "Transportasi",
    description: "Bensin Motor",
    amount: -150000,
    date: "2024-01-14T16:45:00",
    paymentMethod: "Tunai",
    location: "SPBU Shell",
    icon: Car,
    color: "text-blue-500",
  },
  {
    id: 4,
    type: "expense",
    category: "Rumah",
    description: "Listrik PLN",
    amount: -450000,
    date: "2024-01-13T14:20:00",
    paymentMethod: "Transfer Bank",
    location: "Online",
    icon: Zap,
    color: "text-yellow-500",
  },
  {
    id: 5,
    type: "expense",
    category: "Makanan",
    description: "Kafe Corner",
    amount: -85000,
    date: "2024-01-12T19:30:00",
    paymentMethod: "E-Wallet",
    location: "Mall Central Park",
    icon: Coffee,
    color: "text-amber-600",
  },
  {
    id: 6,
    type: "expense",
    category: "Rumah",
    description: "Sewa Apartemen",
    amount: -2500000,
    date: "2024-01-01T08:00:00",
    paymentMethod: "Transfer Bank",
    location: "Jakarta Pusat",
    icon: Home,
    color: "text-purple-500",
  },
  {
    id: 7,
    type: "expense",
    category: "Kesehatan",
    description: "Konsultasi Dokter",
    amount: -300000,
    date: "2024-01-10T15:00:00",
    paymentMethod: "Kartu Kredit",
    location: "RS Siloam",
    icon: Heart,
    color: "text-red-500",
  },
  {
    id: 8,
    type: "expense",
    category: "Pendidikan",
    description: "Kursus Online",
    amount: -500000,
    date: "2024-01-08T20:00:00",
    paymentMethod: "Kartu Kredit",
    location: "Online",
    icon: GraduationCap,
    color: "text-indigo-500",
  },
]

export function TransactionList() {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Math.abs(amount))
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  }

  const groupTransactionsByDate = (transactions: any[]) => {
    const groups: { [key: string]: any[] } = {}
    transactions.forEach((transaction) => {
      const dateKey = new Date(transaction.date).toDateString()
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(transaction)
    })
    return groups
  }

  const groupedTransactions = groupTransactionsByDate(mockTransactions)

  const handleEditTransaction = (transaction: any) => {
    setSelectedTransaction(transaction)
    setIsModalOpen(true)
  }

  const handleDeleteTransaction = (transactionId: number) => {
    console.log("Delete transaction:", transactionId)
    // In real app, this would call an API to delete the transaction
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Transaksi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(groupedTransactions)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .map(([dateKey, transactions]) => {
              const date = new Date(dateKey)
              const formattedDate = date.toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })

              const dayTotal = transactions.reduce((sum, t) => sum + t.amount, 0)

              return (
                <div key={dateKey} className="space-y-3">
                  {/* Date Header */}
                  <div className="flex items-center justify-between py-2 border-b">
                    <h3 className="font-medium text-sm">{formattedDate}</h3>
                    <Badge variant={dayTotal >= 0 ? "default" : "secondary"} className="text-xs">
                      {dayTotal >= 0 ? "+" : ""}
                      {formatCurrency(dayTotal)}
                    </Badge>
                  </div>

                  {/* Transactions for this date */}
                  <div className="space-y-2">
                    {transactions
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((transaction) => {
                        const Icon = transaction.icon
                        const isIncome = transaction.type === "income"
                        const { time } = formatDateTime(transaction.date)

                        return (
                          <div
                            key={transaction.id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer"
                            onClick={() => handleEditTransaction(transaction)}
                          >
                            {/* Icon */}
                            <div className={`p-2 rounded-full bg-muted ${transaction.color}`}>
                              <Icon className="h-4 w-4" />
                            </div>

                            {/* Transaction Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="min-w-0 flex-1">
                                  <p className="font-medium truncate">{transaction.description}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className="text-xs">
                                      {transaction.category}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">{time}</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {transaction.paymentMethod} • {transaction.location}
                                  </p>
                                </div>
                                <div className="text-right ml-3">
                                  <p className={`font-semibold ${isIncome ? "text-success" : "text-destructive"}`}>
                                    {isIncome ? "+" : "-"}
                                    {formatCurrency(transaction.amount)}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* More Options */}
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
                                <DropdownMenuItem onClick={() => handleEditTransaction(transaction)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteTransaction(transaction.id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Hapus
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )
                      })}
                  </div>
                </div>
              )
            })}

          {/* Empty State */}
          {mockTransactions.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Belum ada transaksi</h3>
              <p className="text-muted-foreground mb-4">Mulai catat transaksi pertama Anda</p>
              <Button>Tambah Transaksi</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedTransaction(null)
        }}
        transaction={selectedTransaction}
      />
    </>
  )
}
