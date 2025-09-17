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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { CalendarIcon, User, Building, Percent } from "lucide-react"

const debtTypes = [
  "Pinjaman Pribadi",
  "Kredit Rumah",
  "Kredit Kendaraan",
  "Kartu Kredit",
  "Pinjaman Koperasi",
  "Pinjaman Bank",
  "Pinjaman Bisnis",
  "Pinjaman Keluarga",
  "Lainnya",
]

interface DebtModalProps {
  isOpen: boolean
  onClose: () => void
  debt?: any
  type: "debt" | "credit"
}

export function DebtModal({ isOpen, onClose, debt, type }: DebtModalProps) {
  const [formData, setFormData] = useState({
    creditorDebtor: "",
    type: "",
    totalAmount: "",
    remainingAmount: "",
    monthlyPayment: "",
    interestRate: "",
    startDate: new Date(),
    endDate: new Date(),
    dueDate: new Date(),
    notes: "",
  })

  const [selectedStartDate, setSelectedStartDate] = useState<Date>()
  const [selectedEndDate, setSelectedEndDate] = useState<Date>()
  const [selectedDueDate, setSelectedDueDate] = useState<Date>()

  useEffect(() => {
    if (debt) {
      setFormData({
        creditorDebtor: type === "debt" ? debt.creditor : debt.debtor,
        type: debt.type,
        totalAmount: debt.totalAmount.toString(),
        remainingAmount: debt.remainingAmount.toString(),
        monthlyPayment: debt.monthlyPayment.toString(),
        interestRate: debt.interestRate.toString(),
        startDate: new Date(debt.startDate),
        endDate: new Date(debt.endDate),
        dueDate: new Date(debt.dueDate),
        notes: debt.notes || "",
      })
      setSelectedStartDate(new Date(debt.startDate))
      setSelectedEndDate(new Date(debt.endDate))
      setSelectedDueDate(new Date(debt.dueDate))
    } else {
      // Reset form for new debt/credit
      const today = new Date()
      const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())
      const nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())

      setFormData({
        creditorDebtor: "",
        type: "",
        totalAmount: "",
        remainingAmount: "",
        monthlyPayment: "",
        interestRate: "",
        startDate: today,
        endDate: nextYear,
        dueDate: nextMonth,
        notes: "",
      })
      setSelectedStartDate(today)
      setSelectedEndDate(nextYear)
      setSelectedDueDate(nextMonth)
    }
  }, [debt, type])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Debt/Credit data:", formData)
    // In real app, this would save to database
    onClose()
  }

  const formatCurrency = (value: string) => {
    const number = Number.parseInt(value.replace(/\D/g, ""))
    if (isNaN(number)) return ""
    return new Intl.NumberFormat("id-ID").format(number)
  }

  const handleAmountChange = (field: string, value: string) => {
    const cleanValue = value.replace(/\D/g, "")
    setFormData({ ...formData, [field]: cleanValue })
  }

  const isDebt = type === "debt"
  const title = debt ? `Edit ${isDebt ? "Hutang" : "Piutang"}` : `Tambah ${isDebt ? "Hutang" : "Piutang"}`

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Creditor/Debtor */}
          <div className="space-y-2">
            <Label htmlFor="creditorDebtor">{isDebt ? "Pemberi Pinjaman" : "Peminjam"}</Label>
            <div className="relative">
              {isDebt ? (
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              ) : (
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              )}
              <Input
                id="creditorDebtor"
                value={formData.creditorDebtor}
                onChange={(e) => setFormData({ ...formData, creditorDebtor: e.target.value })}
                placeholder={isDebt ? "Contoh: Bank BCA, Teman - Budi" : "Contoh: Teman - Sari, PT ABC"}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label>Jenis {isDebt ? "Hutang" : "Piutang"}</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis" />
              </SelectTrigger>
              <SelectContent>
                {debtTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Total Amount */}
          <div className="space-y-2">
            <Label htmlFor="totalAmount">Jumlah Total</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">Rp</span>
              <Input
                id="totalAmount"
                value={formatCurrency(formData.totalAmount)}
                onChange={(e) => handleAmountChange("totalAmount", e.target.value)}
                placeholder="0"
                className="pl-10 text-right"
                required
              />
            </div>
          </div>

          {/* Remaining Amount */}
          <div className="space-y-2">
            <Label htmlFor="remainingAmount">Sisa {isDebt ? "Hutang" : "Piutang"}</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">Rp</span>
              <Input
                id="remainingAmount"
                value={formatCurrency(formData.remainingAmount)}
                onChange={(e) => handleAmountChange("remainingAmount", e.target.value)}
                placeholder="0"
                className="pl-10 text-right"
                required
              />
            </div>
          </div>

          {/* Monthly Payment */}
          <div className="space-y-2">
            <Label htmlFor="monthlyPayment">Cicilan Bulanan</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">Rp</span>
              <Input
                id="monthlyPayment"
                value={formatCurrency(formData.monthlyPayment)}
                onChange={(e) => handleAmountChange("monthlyPayment", e.target.value)}
                placeholder="0"
                className="pl-10 text-right"
                required
              />
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <Label htmlFor="interestRate">Bunga per Bulan (%)</Label>
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                value={formData.interestRate}
                onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                placeholder="0.0"
                className="pl-10"
              />
            </div>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label>Tanggal Mulai</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-transparent",
                    !selectedStartDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedStartDate ? (
                    selectedStartDate.toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  ) : (
                    <span>Pilih tanggal mulai</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedStartDate}
                  onSelect={(date) => {
                    setSelectedStartDate(date)
                    if (date) {
                      setFormData({ ...formData, startDate: date })
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <Label>Tanggal Berakhir</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-transparent",
                    !selectedEndDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedEndDate ? (
                    selectedEndDate.toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  ) : (
                    <span>Pilih tanggal berakhir</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedEndDate}
                  onSelect={(date) => {
                    setSelectedEndDate(date)
                    if (date) {
                      setFormData({ ...formData, endDate: date })
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label>Tanggal Jatuh Tempo Berikutnya</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-transparent",
                    !selectedDueDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDueDate ? (
                    selectedDueDate.toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  ) : (
                    <span>Pilih tanggal jatuh tempo</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDueDate}
                  onSelect={(date) => {
                    setSelectedDueDate(date)
                    if (date) {
                      setFormData({ ...formData, dueDate: date })
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
              placeholder="Tambahkan catatan..."
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Batal
            </Button>
            <Button type="submit" className="flex-1">
              {debt ? "Simpan Perubahan" : `Tambah ${isDebt ? "Hutang" : "Piutang"}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
