"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  ShoppingCart,
  Car,
  Home,
  Utensils,
  Heart,
  Gamepad2,
  GraduationCap,
  Briefcase,
  Gift,
  TrendingUp,
} from "lucide-react"

const budgetCategories = [
  { name: "Makanan", icon: Utensils, color: "text-orange-500" },
  { name: "Transportasi", icon: Car, color: "text-blue-500" },
  { name: "Belanja", icon: ShoppingCart, color: "text-purple-500" },
  { name: "Rumah", icon: Home, color: "text-green-500" },
  { name: "Kesehatan", icon: Heart, color: "text-red-500" },
  { name: "Hiburan", icon: Gamepad2, color: "text-pink-500" },
  { name: "Pendidikan", icon: GraduationCap, color: "text-indigo-500" },
  { name: "Pekerjaan", icon: Briefcase, color: "text-gray-500" },
  { name: "Lainnya", icon: Gift, color: "text-yellow-500" },
]

const budgetPeriods = ["Bulanan", "Mingguan", "Harian"]

interface BudgetModalProps {
  isOpen: boolean
  onClose: () => void
  budget?: any
}

export function BudgetModal({ isOpen, onClose, budget }: BudgetModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    budgetAmount: "",
    period: "Bulanan",
    alertThreshold: "80",
    notes: "",
  })

  useEffect(() => {
    if (budget) {
      setFormData({
        name: budget.name,
        budgetAmount: budget.budgetAmount.toString(),
        period: "Bulanan",
        alertThreshold: "80",
        notes: budget.notes || "",
      })
    } else {
      // Reset form for new budget
      setFormData({
        name: "",
        budgetAmount: "",
        period: "Bulanan",
        alertThreshold: "80",
        notes: "",
      })
    }
  }, [budget])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Budget data:", formData)
    // In real app, this would save to database
    onClose()
  }

  const formatCurrency = (value: string) => {
    const number = Number.parseInt(value.replace(/\D/g, ""))
    if (isNaN(number)) return ""
    return new Intl.NumberFormat("id-ID").format(number)
  }

  const handleAmountChange = (value: string) => {
    const cleanValue = value.replace(/\D/g, "")
    setFormData({ ...formData, budgetAmount: cleanValue })
  }

  const selectedCategory = budgetCategories.find((cat) => cat.name === formData.name)
  const currentSpent = budget?.spentAmount || 0
  const budgetAmount = Number.parseInt(formData.budgetAmount) || 0
  const currentProgress = budgetAmount > 0 ? (currentSpent / budgetAmount) * 100 : 0

  const formatBudgetCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{budget ? "Edit Budget" : "Tambah Budget Baru"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label>Kategori</Label>
            <div className="grid grid-cols-3 gap-2">
              {budgetCategories.map((category) => {
                const Icon = category.icon
                const isSelected = formData.name === category.name
                return (
                  <Button
                    key={category.name}
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => setFormData({ ...formData, name: category.name })}
                    className="h-auto p-3 flex flex-col items-center gap-1 bg-transparent"
                  >
                    <Icon className={`h-4 w-4 ${isSelected ? "" : category.color}`} />
                    <span className="text-xs">{category.name}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Budget Amount */}
          <div className="space-y-2">
            <Label htmlFor="budgetAmount">Jumlah Budget</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">Rp</span>
              <Input
                id="budgetAmount"
                value={formatCurrency(formData.budgetAmount)}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0"
                className="pl-10 text-right text-lg font-semibold"
                required
              />
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="space-y-2">
            <Label>Jumlah Cepat</Label>
            <div className="grid grid-cols-3 gap-2">
              {[500000, 1000000, 2000000].map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant="outline"
                  onClick={() => setFormData({ ...formData, budgetAmount: amount.toString() })}
                  className="text-xs bg-transparent"
                >
                  {formatBudgetCurrency(amount)}
                </Button>
              ))}
            </div>
          </div>

          {/* Period */}
          <div className="space-y-2">
            <Label>Periode</Label>
            <Select value={formData.period} onValueChange={(value) => setFormData({ ...formData, period: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {budgetPeriods.map((period) => (
                  <SelectItem key={period} value={period}>
                    {period}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Alert Threshold */}
          <div className="space-y-2">
            <Label htmlFor="alertThreshold">Peringatan pada (%)</Label>
            <Select
              value={formData.alertThreshold}
              onValueChange={(value) => setFormData({ ...formData, alertThreshold: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50">50% - Peringatan Dini</SelectItem>
                <SelectItem value="70">70% - Peringatan Sedang</SelectItem>
                <SelectItem value="80">80% - Peringatan Normal</SelectItem>
                <SelectItem value="90">90% - Peringatan Akhir</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Current Progress (if editing) */}
          {budget && (
            <div className="p-4 rounded-lg bg-muted/50 space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <h4 className="font-semibold">Progress Saat Ini</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Terpakai</span>
                  <span>{Math.round(currentProgress)}%</span>
                </div>
                <Progress value={currentProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {formatBudgetCurrency(currentSpent)} / {formatBudgetCurrency(budgetAmount)}
                </p>
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Catatan (Opsional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Tambahkan catatan untuk budget ini..."
              rows={3}
            />
          </div>

          {/* Budget Tips */}
          <div className="p-3 rounded-lg bg-primary/10 text-sm">
            <h4 className="font-medium text-primary mb-1">💡 Tips Budget</h4>
            <ul className="text-muted-foreground space-y-1 text-xs">
              <li>• Gunakan aturan 50/30/20: 50% kebutuhan, 30% keinginan, 20% tabungan</li>
              <li>• Set peringatan di 80% untuk kontrol yang lebih baik</li>
              <li>• Review dan sesuaikan budget setiap bulan</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Batal
            </Button>
            <Button type="submit" className="flex-1">
              {budget ? "Simpan Perubahan" : "Tambah Budget"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
