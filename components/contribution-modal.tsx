"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { CalendarIcon, TrendingUp, Target } from "lucide-react"

interface ContributionModalProps {
  isOpen: boolean
  onClose: () => void
  goal?: any
}

export function ContributionModal({ isOpen, onClose, goal }: ContributionModalProps) {
  const [formData, setFormData] = useState({
    amount: "",
    date: new Date(),
    notes: "",
  })

  const [selectedDate, setSelectedDate] = useState<Date>()

  useEffect(() => {
    // Reset form when modal opens
    setFormData({
      amount: "",
      date: new Date(),
      notes: "",
    })
    setSelectedDate(new Date())
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contribution data:", formData, "for goal:", goal?.id)
    // In real app, this would save to database and update goal progress
    onClose()
  }

  const formatCurrency = (value: string) => {
    const number = Number.parseInt(value.replace(/\D/g, ""))
    if (isNaN(number)) return ""
    return new Intl.NumberFormat("id-ID").format(number)
  }

  const handleAmountChange = (value: string) => {
    const cleanValue = value.replace(/\D/g, "")
    setFormData({ ...formData, amount: cleanValue })
  }

  if (!goal) return null

  const currentProgress = (goal.currentAmount / goal.targetAmount) * 100
  const contributionAmount = Number.parseInt(formData.amount) || 0
  const newAmount = goal.currentAmount + contributionAmount
  const newProgress = (newAmount / goal.targetAmount) * 100
  const isGoalCompleted = newProgress >= 100

  const formatGoalCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tambah Kontribusi</DialogTitle>
        </DialogHeader>

        {/* Goal Info */}
        <div className="p-4 rounded-lg bg-muted/50 space-y-3">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">{goal.name}</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress Saat Ini</span>
              <span>{Math.round(currentProgress)}%</span>
            </div>
            <Progress value={currentProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {formatGoalCurrency(goal.currentAmount)} / {formatGoalCurrency(goal.targetAmount)}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contribution Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Jumlah Kontribusi</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">Rp</span>
              <Input
                id="amount"
                value={formatCurrency(formData.amount)}
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
              {[500000, 1000000, goal.monthlyTarget].map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant="outline"
                  onClick={() => setFormData({ ...formData, amount: amount.toString() })}
                  className="text-xs bg-transparent"
                >
                  {formatGoalCurrency(amount)}
                </Button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label>Tanggal Kontribusi</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-transparent",
                    !selectedDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    selectedDate.toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  ) : (
                    <span>Pilih tanggal</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date)
                    if (date) {
                      setFormData({ ...formData, date })
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Catatan (Opsional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Sumber kontribusi, catatan tambahan..."
              rows={2}
            />
          </div>

          {/* Preview */}
          {contributionAmount > 0 && (
            <div className="p-4 rounded-lg bg-primary/10 space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <h4 className="font-semibold text-primary">Preview Setelah Kontribusi</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress Baru</span>
                  <span className="font-semibold">{Math.round(newProgress)}%</span>
                </div>
                <Progress value={Math.min(newProgress, 100)} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {formatGoalCurrency(newAmount)} / {formatGoalCurrency(goal.targetAmount)}
                </p>
                {isGoalCompleted && (
                  <div className="text-center py-2">
                    <p className="text-success font-semibold">🎉 Selamat! Tujuan Anda akan tercapai!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Batal
            </Button>
            <Button type="submit" className="flex-1">
              Tambah Kontribusi
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
