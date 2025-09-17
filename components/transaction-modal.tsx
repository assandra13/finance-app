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
import { cn } from "@/lib/utils"
import {
  CalendarIcon,
  Camera,
  MapPin,
  CreditCard,
  ShoppingCart,
  Car,
  Home,
  Heart,
  GraduationCap,
  Gamepad2,
  TrendingUp,
  Utensils,
} from "lucide-react"

const categories = [
  { name: "Makanan", icon: Utensils, color: "text-orange-500" },
  { name: "Transportasi", icon: Car, color: "text-blue-500" },
  { name: "Belanja", icon: ShoppingCart, color: "text-purple-500" },
  { name: "Rumah", icon: Home, color: "text-green-500" },
  { name: "Hiburan", icon: Gamepad2, color: "text-pink-500" },
  { name: "Kesehatan", icon: Heart, color: "text-red-500" },
  { name: "Pendidikan", icon: GraduationCap, color: "text-indigo-500" },
  { name: "Gaji", icon: TrendingUp, color: "text-emerald-500" },
  { name: "Investasi", icon: TrendingUp, color: "text-yellow-500" },
]

const paymentMethods = ["Tunai", "Kartu Debit", "Kartu Kredit", "E-Wallet", "Transfer Bank"]

interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
  transaction?: any
}

export function TransactionModal({ isOpen, onClose, transaction }: TransactionModalProps) {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    paymentMethod: "",
    location: "",
    date: new Date(),
    notes: "",
  })

  const [selectedDate, setSelectedDate] = useState<Date>()

  useEffect(() => {
    if (transaction) {
      setFormData({
        type: transaction.type,
        amount: Math.abs(transaction.amount).toString(),
        category: transaction.category,
        description: transaction.description,
        paymentMethod: transaction.paymentMethod,
        location: transaction.location,
        date: new Date(transaction.date),
        notes: transaction.notes || "",
      })
      setSelectedDate(new Date(transaction.date))
    } else {
      // Reset form for new transaction
      setFormData({
        type: "expense",
        amount: "",
        category: "",
        description: "",
        paymentMethod: "",
        location: "",
        date: new Date(),
        notes: "",
      })
      setSelectedDate(new Date())
    }
  }, [transaction])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Transaction data:", formData)
    // In real app, this would save to database
    onClose()
  }

  const formatCurrency = (value: string) => {
    const number = Number.parseInt(value.replace(/\D/g, ""))
    if (isNaN(number)) return ""
    return new Intl.NumberFormat("id-ID").format(number)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    setFormData({ ...formData, amount: value })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{transaction ? "Edit Transaksi" : "Tambah Transaksi"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Transaction Type */}
          <div className="space-y-2">
            <Label>Jenis Transaksi</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={formData.type === "income" ? "default" : "outline"}
                onClick={() => setFormData({ ...formData, type: "income" })}
                className="justify-start"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Pemasukan
              </Button>
              <Button
                type="button"
                variant={formData.type === "expense" ? "default" : "outline"}
                onClick={() => setFormData({ ...formData, type: "expense" })}
                className="justify-start"
              >
                <TrendingUp className="h-4 w-4 mr-2 rotate-180" />
                Pengeluaran
              </Button>
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Jumlah</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">Rp</span>
              <Input
                id="amount"
                value={formatCurrency(formData.amount)}
                onChange={handleAmountChange}
                placeholder="0"
                className="pl-10 text-right text-lg font-semibold"
                required
              />
            </div>
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label>Kategori</Label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((category) => {
                const Icon = category.icon
                const isSelected = formData.category === category.name
                return (
                  <Button
                    key={category.name}
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => setFormData({ ...formData, category: category.name })}
                    className="h-auto p-3 flex flex-col items-center gap-1 bg-transparent"
                  >
                    <Icon className={`h-4 w-4 ${isSelected ? "" : category.color}`} />
                    <span className="text-xs">{category.name}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Contoh: Makan siang di restoran"
              required
            />
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label>Metode Pembayaran</Label>
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map((method) => (
                <Button
                  key={method}
                  type="button"
                  variant={formData.paymentMethod === method ? "default" : "outline"}
                  onClick={() => setFormData({ ...formData, paymentMethod: method })}
                  className="justify-start text-sm bg-transparent"
                >
                  <CreditCard className="h-3 w-3 mr-2" />
                  {method}
                </Button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label>Tanggal</Label>
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

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Lokasi (Opsional)</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Contoh: Mall Central Park"
                className="pl-10"
              />
            </div>
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

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label>Bukti Transaksi (Opsional)</Label>
            <Button type="button" variant="outline" className="w-full justify-start bg-transparent">
              <Camera className="h-4 w-4 mr-2" />
              Ambil Foto Struk
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Batal
            </Button>
            <Button type="submit" className="flex-1">
              {transaction ? "Simpan Perubahan" : "Tambah Transaksi"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
